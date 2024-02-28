"use client"
import axiosInstance from '../../api/post'; // replace './post' with the actual path to your post.js file

const Dummy = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const files = e.target.elements.file.files;
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" directory="" webkitdirectory="" mozdirectory="" multiple />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Dummy;