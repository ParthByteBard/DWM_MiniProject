// // import React from 'react';
// // import FoodClassifier from './components/FileUpload'; // Adjust the path according to your folder structure


// // const App = () => {
// //   return (
// //     <div>
// //       <FoodClassifier />
// //     </div>
// //   );
// // };

// // export default App;
// import React from 'react';
// import FoodClassifier from './components/FileUpload'; // Adjust the path according to your folder structure
// import Accuracy from './assets/accuracy_image.png';
// import Loss from './assets/loss_image.png';

// const App = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
//       {/* Title Section */}
//       <h1 className="text-3xl font-bold text-center mb-5 animate-bounce">
//         Binary Classifier built with Deep Learning & CNN
//       </h1>

//       {/* Food Classifier Component */}
//       <FoodClassifier />

//       {/* How the Model Works Section */}
//       <div className="mt-10 w-full max-w-2xl mx-auto text-center">
//         <h2 className="text-2xl font-semibold mb-3">How the Model Works</h2>
//         <p className="text-lg text-gray-700 mb-5">
//           The Happy/Sad Classifier is a binary classifier that identifies a person as Happy/Sad using Deep Learning and Convolutional Neural Networks (CNN). The model is built using TensorFlow and Keras, leveraging a dataset of <strong>305 images</strong> sourced from Google. The training process involves several critical steps:
//         </p>
//         <ul className="list-disc list-inside text-left text-gray-700 mb-5">
//           <li><strong>Data Preprocessing:</strong> Images were loaded, validated, and scaled from pixel values of 0–255 to a range of 0–1 for better performance.</li>
//           <li><strong>Model Architecture:</strong> The model uses multiple convolutional and pooling layers, followed by dense layers to classify the images.</li>
//           <li><strong>Training:</strong> The model was trained for 20 epochs, utilizing a training dataset split of 70% for training, 20% for validation, and 10% for testing.</li>
//           <li><strong>Performance Metrics:</strong> Metrics like precision, recall, and binary accuracy were used to evaluate the model’s effectiveness, ensuring robust performance in real-world applications.</li>
//         </ul>
//         <p className="text-gray-700 mb-5">
//           This model was built from scratch including the selection of proper images as a part of dataset, dataset was cleaned, doggy images were removed. Scaling ensured that the pixel values remaining between 0 and 1 enabling the model to capture features properly while training.
//         </p>
//       </div>

//       {/* Performance Graphs Section */}
//       <div className="mt-10 w-full max-w-2xl mx-auto text-center">
//         <h2 className="text-2xl font-semibold mb-3">How our Model Performed While Training?</h2>
//         <div className="flex flex-col md:flex-row justify-center">
//           <img
//             src={Accuracy}
//             alt="Accuracy Graph"
//             className="w-full md:w-1/2 mb-5 transition-transform transform hover:scale-105 mx-5"
//           />
//           <img
//             src={Loss}
//             alt="Loss Graph"
//             className="w-full md:w-1/2 mb-5 transition-transform transform hover:scale-105 mx-5"
//           />
//         </div>
//         <h1 className="font-bold underline text-black text-center text-2xl my-10">Group Members</h1>
//         <ul className="list-decimal list-inside text-left text-black text-xl font-semibold mb-[50px]">
//           <li><strong>22102A0007 :</strong> Parth Satvekar</li>
//           <li><strong>22102A0026 :</strong> Jaskirat Singh</li>
//           <li><strong>22102A0023 :</strong> Aditya Mamluskar</li>
//           <li><strong>22102A0021 :</strong> Soham Jambhwadekar</li>
//         </ul>

//       </div>
//     </div>
//   );
// };

// export default App;
import React from 'react';
import FoodClassifier from './components/FileUpload';
import Accuracy from './assets/accuracy_image.png';
import Loss from './assets/loss_image.png';
import BackgroundImage from './assets/Techy-image.jpg'; // Update the path to the uploaded background image

const App = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed text-white p-5"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-center mb-5 animate-bounce">
        Binary Classifier built with Deep Learning & CNN
      </h1>

      {/* Food Classifier Component */}
      <FoodClassifier />

      {/* How the Model Works Section */}
      <div className="mt-10 w-full max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-3">How the Model Works</h2>
        <p className="text-lg mb-5">
          The Happy/Sad Classifier is a binary classifier that identifies a person as Happy/Sad using Deep Learning and Convolutional Neural Networks (CNN). The model is built using TensorFlow and Keras, leveraging a dataset of <strong>305 images</strong> sourced from Google. The training process involves several critical steps:
        </p>
        <ul className="list-disc list-inside text-left mb-5 text-lg">
          <li><strong>Data Preprocessing:</strong> Images were loaded, validated, and scaled from pixel values of 0–255 to a range of 0–1 for better performance.</li>
          <li><strong>Model Architecture:</strong> The model uses multiple convolutional and pooling layers, followed by dense layers to classify the images.</li>
          <li><strong>Training:</strong> The model was trained for 20 epochs, utilizing a training dataset split of 70% for training, 20% for validation, and 10% for testing.</li>
          <li><strong>Performance Metrics:</strong> Metrics like precision, recall, and binary accuracy were used to evaluate the model’s effectiveness, ensuring robust performance in real-world applications.</li>
        </ul>
        <p>
          This model was built from scratch, including dataset cleaning. Images were scaled for better feature extraction during training.
        </p>
      </div>

      {/* Performance Graphs Section */}
      <div className="mt-10 w-full max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-3">How our Model Performed While Training?</h2>
        <div className="flex flex-col md:flex-row justify-center">
          <img
            src={Accuracy}
            alt="Accuracy Graph"
            className="w-full md:w-1/2 mb-5 transition-transform transform hover:scale-105 mx-5"
          />
          <img
            src={Loss}
            alt="Loss Graph"
            className="w-full md:w-1/2 mb-5 transition-transform transform hover:scale-105 mx-5"
          />
        </div>

        {/* Group Members Section */}
        <h1 className="font-bold underline text-white text-center text-2xl my-10">Group Members</h1>
        <ul className="list-decimal list-inside text-left text-white text-xl font-semibold mb-[50px]">
          <li><strong>22102A0007 :</strong> Parth Satvekar</li>
          <li><strong>22102A0026 :</strong> Jaskirat Singh</li>
          <li><strong>22102A0023 :</strong> Aditya Mamluskar</li>
          <li><strong>22102A0021 :</strong> Soham Jambhwadekar</li>
        </ul>
      </div>

      {/* Image Attribution */}
      <p className="text-sm mt-5">
        <a href="https://www.freepik.com/free-photo/technology-network-background-connection-cyber-space-ai-generative_42742270.htm#query=neural%20network&position=16&from_view=keyword&track=ais_hybrid-rr-similar&uuid=3b08b3e7-cedb-4a92-8190-ac497fada5c5">Image by chandlervid85</a> on Freepik
      </p>
    </div>
  );
};

export default App;
