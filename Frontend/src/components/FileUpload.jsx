// import { useState } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [imageSrc, setImageSrc] = useState('');
//   const [classification, setClassification] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     const reader = new FileReader();
//     reader.onloadend = () => setImageSrc(reader.result);
//     reader.readAsDataURL(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const res = await axios.post('http://localhost:5000/predict', formData);
//       console.log(res.data);
//       // Assuming the response contains a key called 'prediction'
//       setClassification(res.data); // Access the specific prediction data
//     } catch (err) {
//       console.error('Error uploading file:', err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center  bg-gray-100">
//       <div className="max-w-md p-6 bg-white rounded-md shadow-md">
//         <h1 className="text-2xl font-bold mb-4 text-center">Upload and Classify Images as Happy/Sad</h1>
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="mb-4"
//         />
//         {imageSrc && <img src={imageSrc} alt="Uploaded" className="mb-4 w-full h-auto" />}
//         <button
//           onClick={handleUpload}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Classify
//         </button>
//         {classification && (
//           <div className="mt-4 text-xl">
//             <strong>Classification: </strong>
//             {classification} {/* Now displaying the prediction text */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileUpload;
import { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [classification, setClassification] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => setImageSrc(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:8080/predict', formData);
      console.log(res.data);
      // Assuming the response contains a key called 'prediction'
      setClassification(res.data); // Access the specific prediction data
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-opacity-50 p-8 backdrop-blur-lg rounded-xl shadow-xl bg-black/40 w-full max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-white animate-pulse">
        Upload and Classify Images
      </h1>

      {/* File Input */}
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-6 p-3 text-sm text-gray-400 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-700 transition-colors duration-300"
      />

      {/* Display Uploaded Image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded"
          className="mb-6 w-full h-auto max-h-64 object-cover rounded-lg shadow-md border border-gray-700 transition-transform hover:scale-105"
        />
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="w-full py-2 text-lg bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300 focus:outline-none"
      >
        Classify
      </button>

      {/* Display Classification Result */}
      {classification && (
        <div className="mt-6 text-xl text-white font-medium">
          <strong>Classification:</strong> {classification}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
