// "use client"
// import { useCallback, useRef } from 'react';
// import { useHistory } from 'react-router-dom'
// import { useDropzone } from 'react-dropzone';

// const Dropzone = () => {
  
//   const onDrop = useCallback((acceptedFiles) => {
//     // Do something with the accepted files (folders)
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'application/x-directory' });

//   const fileInputRef = useRef();

//   const handleClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//     // Handle the files here (upload, read, etc.)
//   };

//   return (
//     <>
//     <div {...getRootProps()} className="bg-[#e1f4ff] border-solid border-[10px] border-[#dde4ff] h-[400px] mt-16 mx-6 rounded-2xl flex flex-col items-center justify-center">
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p className="font-outfit text-[1.75rem]">Drop the folder here</p>
//       ) : (
//         <>
//           <p className="font-outfit text-[1.75rem]">Your guardian against compromised configuration</p>
//           <p className="font-outfit text-[1.05rem] mt-1">Drop the folder containing all the config files</p>
//         </>
//       )}
//     </div>
//     <div className="dropbtn flex flex-col items-center">
//       <h2 className="font-outline font-bold text-[1.5rem] mt-5">OR</h2>
//       <input
//         type="file"
//         style={{ display: 'none' }}
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         directory="" webkitdirectory="" mozdirectory=""
//       />
//       <button onClick={handleClick} className="bg-[#4f96fb] hover:bg-[#73adff] text-white px-7 py-2 mt-5 rounded-full signin">Upload your folder</button>
//     </div>
//     </>
//   );
// };

// export default Dropzone;