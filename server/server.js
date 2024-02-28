import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cors from "cors"
const upload = multer({ storage: multer.memoryStorage()});
import {spawn} from 'child_process'
import fs from 'fs'
import dotenv from "dotenv"
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

app.get("/execute",async(req,res)=>{
    let files = await File.find({});
    files.forEach((file)=> {
        const python=spawn('python',['main.py'])
        python.stdin.write(file.file_name)
        python.stdin.end()
        console.log("Route hit confirm")
        python.stdout.on('data', (data) => {
            File.updateOne({_id:file._id},{report:data.toString()})
                .then(()=>{
                    console.log("Report generated for ",file.file_name)
                    fs.writeFile(`Report-${file.file_name.slice(0,-4)}.txt`,data.toString(),(err)=>{
                        if(err){
                            console.log(`Error writing report to file ${file.file_name}`,err)
                        }else{
                            console.log(`File generation successful for ${file.file_name}`)
                        }
                    })
                })
                .catch((err)=>{
                    console.log("Error in generation ",err)
                })
        });
        python.on('close', (code) => {
          console.log("Process exited with code ",code)
        })
    });
    res.send("Execution Successful")
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



app.listen(process.env.PORT, () => {
    console.log('Server ON');
});
