
import os
import base64
import numpy as np
from flask import Flask, request, jsonify, render_template,redirect,url_for
from tensorflow.keras.models import load_model # type: ignore
from werkzeug.utils import secure_filename
import cv2
import tensorflow as tf
from flask_cors import CORS
from waitress import serve



# Initialize the Flask app
app = Flask(__name__)
CORS(app)
# Path to upload folders
UPLOAD_FOLDER = 'uploads'


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# Ensure the folders exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Load the trained food classification model
food_model = load_model('Happy_Sad_Classifier.keras')


def predict_image(file_path):
    # Read the image
    img = cv2.imread(file_path)
    
    # Resize the image to (256, 256)
    img = tf.image.resize(img, (256, 256))
    
    # Normalize and expand dimensions
    img_array = np.expand_dims(img / 255.0, axis=0)  # Ensure shape is (1, 256, 256, 3)
    
    # Predict
    prediction = food_model.predict(img_array)[0][0]
    
    # Return 'Healthy' or 'Unhealthy' based on the prediction
    if prediction < 0.5:
        return 'Happy'
    else:
        return 'Sad'
    

# Route for food classification
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return redirect(url_for('home'))

    file = request.files['file']

    if file.filename == '':
       return redirect(url_for('home'))

    if file:
        # Secure and save the uploaded file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Get the classification result
        classification = predict_image(file_path)
        print(classification);

        # Pass the image path and classification to the template for rendering
        return classification

# Route for image colorization

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=8080)
 
    