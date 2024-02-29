"use client"
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosInstance from '../../api/post';
import Link from 'next/link';

const DragNDrop = () => {
  const [uploadSuccessful, setUploadSuccessful] = useState(false);

  const onDrop = (acceptedFiles) => {
    const formData = new FormData();

    acceptedFiles.forEach(file => {
      formData.append('file', file);
    });

    axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response);
      setUploadSuccessful(true);
    }).catch(error => {
      console.error(error);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true, noKeyboard: true });

  const handleExecute = async() => {
    //timeout

    await new Promise(resolve => setTimeout(resolve, 10000))
    //
    axiosInstance.get('/execute')
      .then(response => {
        console.log(response);
        // Redirect to '/execute' page or handle response here
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <div {...getRootProps()} className='bg-blue-200 text-black font-bold font-sans h-[500px] flex justify-center items-center mx-20 mt-10 border-solid border-[5px] rounded-lg border-blue-300 hover:bg-blue-50 drag'>
        <input {...getInputProps()} directory="" webkitdirectory="" mozdirectory="" />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className="submit w-screen flex justify-center mt-5">
        {uploadSuccessful && <button onClick={handleExecute} className='bg-blue-300 font-sans px-8 py-2 rounded-full font-semibold hover:bg-blue-50 hover:border-[3px] hover:border-solid hover:rounded-full hover:border-blue-300 drag'>
          <Link href="/execute">Get Report</Link>
        </button>}
      </div>
    </div>
  );
};

export default DragNDrop;

// "use client"
// import React, { useState, useContext } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axiosInstance from '../../api/post';
// import { FileNamesContext } from './FileNamesContext'; // import the context

// const DragNDrop = () => {
//   const [uploadSuccessful, setUploadSuccessful] = useState(false);
//   const { setFileNames } = useContext(FileNamesContext); // get the setFileNames function from the context

//   const onDrop = (acceptedFiles) => {
//     const formData = new FormData();

//     acceptedFiles.forEach(file => {
//       formData.append('file', file);
//     });

//     // set the fileNames state to the names of the dropped files
//     setFileNames(acceptedFiles.map(file => file.name));

//     axiosInstance.post('/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     }).then(response => {
//       console.log(response);
//       setUploadSuccessful(true);
//     }).catch(error => {
//       console.error(error);
//     });
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true, noKeyboard: true });

//   const handleExecute = () => {
//     axiosInstance.get('/execute')
//       .then(response => {
//         console.log(response);
//         // Redirect to '/execute' page or handle response here
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} directory="" webkitdirectory="" mozdirectory="" />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       </div>
//       {uploadSuccessful && <button onClick={handleExecute}>Go to Execute</button>}
//     </div>
//   );
// };

// export default DragNDrop;

