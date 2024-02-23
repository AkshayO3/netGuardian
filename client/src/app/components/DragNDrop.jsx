"use client"
import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

const DragNDrop= ({ className }) => {
  const [files, setFiles] = useState([])
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
    if(acceptedFiles?.length){
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
            Object.assign(file, {preview: URL.createObjectURL(file)})
          )
      ])
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <form>
      <div {...getRootProps({
        className: className
      })}>
      <p className='font-outfit font-medium text-[24px] text-black'>Your guardian against compromised configuration</p>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className='text-black font-light text-[16px]'>Drop the files here ...</p> :
          <p className='text-black font-light text-[16px]'>Drop the folder containing all the config files here.</p>
      }
    </div>
    <div className="droBtn flex flex-col items-center justify-center">
        <p className='font-outfit font-bold m-5 text-[22px]'>OR</p>
        {/* Button to trigger file input */}
        <label htmlFor="fileInput" className="bg-[#4f96fb] text-white text-[18px] px-6 py-2 rounded-full hover:bg-[#73adff] signin cursor-pointer">
          Select folder
        </label>
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => {
            const selectedFiles = Array.from(e.target.files);
            setFiles(previousFiles => [
              ...previousFiles,
              ...selectedFiles.map(file =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
              )
            ]);
          }}
          multiple
          directory
          webkitdirectory
          mozdirectory
        />
      </div>
    <ul>
      {files.map(file => (
        <li key={file.name}>{file.name}</li>
      ))}
    </ul>
    </form>
  )
}

export default DragNDrop