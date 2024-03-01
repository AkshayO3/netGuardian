import express from "express"
import mongoose from "mongoose"
import multer from "multer"
const upload = multer({ storage: multer.memoryStorage()});
import {spawn,exec} from 'child_process'
import fs from 'fs'
import dotenv from "dotenv"
import cors from 'cors'
dotenv.config()


const app = express();
app.use(express.urlencoded({extended:true}))
app.use(cors())


mongoose.connect(process.env.DBURI).then(()=>{
    console.log("Connected to the database")
}).catch((err)=>{console.log("Error connecting to the database ",err)})

const fileSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true
    },
   content: {
        type: String,
        required: true
   },
    report: {
        type:String
    },
    severity: {
        type:Number
    },
    device_name: {
        type:String
    }
},{versionKey:false});

const File = mongoose.model('File',fileSchema)


app.post("/upload",upload.array('file',10),(req,res)=>{
    if(req.files){
        req.files.forEach(file=>{
            fs.writeFile(file.originalname,file.buffer.toString().slice(386),(err)=>{
                if(err){
                    console.log("Error in adding the file into working directory.")
                }else{
                    console.log("File generated successfully and added to directory.")
                }
            })
            File.create({
                file_name:file.originalname,
                content:file.buffer.toString().slice(386)
            }).then(()=>{console.log("File saved successfully.")}).catch((err)=>{
                console.log("Error in saving the file ",err)
            })
        })
    }
    else{
        console.log("Files not found")
    }
    res.send("Uploaded Successfully")
})

app.get("/execute", async (req, res) => {
    let files = await File.find({});
    let fileReports = [];
    let promises = files.map((file) => {
        return new Promise((resolve, reject) => {
            const python = spawn('python3', ['main.py'])
            python.stdin.write(file.file_name)
            python.stdin.end()
            console.log("Route hit confirm")
            python.stdout.on('data', (data) => {
                let lines = data.toString().split("\n");
                File.updateOne({ _id: file._id }, { report: lines.slice(0,-3).join("\n"), severity: parseInt(lines[lines.length-3]),device_name:lines[lines.length-2] })
                    .then(() => {
                        console.log("Report generated for ", file.file_name)
                        fileReports.push({ device_name: lines[lines.length-2], severity: parseInt(lines[lines.length-3]), file_name: file.file_name });
                        fs.writeFile(`Report-${file.file_name.slice(0, -4)}.txt`, lines.slice(0,-3).join("\n"), (err) => {
                            if (err) {
                                console.log(`Error writing report to file ${file.file_name}`, err)
                            } else {
                                console.log(`File generation successful for ${file.file_name}`)
                            }
                        })
                        resolve();
                    })
                    .catch((err) => {
                        console.log("Error in generation ", err)
                        reject(err);
                    })
            });
            python.on('close', (code) => {
                console.log("Process exited with code ", code)
            })
        });
    });

    Promise.all(promises)
        .then(() => res.json(fileReports))
        .catch((err) => res.status(500).json({ error: err.message }));
})

app.get("/download/:fileName",(req,res)=>{
    let fileName = req.params.fileName+".rtf"
    res.download(`Report-${fileName.slice(0,-4)}.txt`,(err)=> {
        if (err) {
            console.log("Error downloading file ", err)
        } else {
            console.log("User has successfully downloaded file ", fileName)
        }
    })
})

app.get("/finish",async(req,res)=>{
    try{
        await File.deleteMany({})
        console.log("Database wiped.")
    }catch (err){
        console.log("Error in wiping database.")
    }
    exec('sh del.sh',(error,stdout,stderr)=>{
        if(error){
            console.log("Error executing script, ",error)
            return res.status(500).send('Error executing script')
        }
        if(stderr){
            console.log("Shell script error ",stderr)
        }
        console.log("Shell script output --> ",stdout)
    })
    console.log("Deleting files....")
    res.send("Data has been deleted from servers.")
})

app.get("/test",(req,res)=> {
    const python = spawn('python3', ['main.py'])
    python.stdin.write('conf_2034.rtf')
    python.stdin.end()
    console.log("Route hit confirm")
    python.stdout.on('data', (data) => {
        let lines = data.toString().split("\n");
        console.log(parseInt(lines[lines.length-3].slice(-1)))
    })
})

app.listen(process.env.PORT, () => {
    console.log('Server ON');
});
