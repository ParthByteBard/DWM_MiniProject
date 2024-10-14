
import os
import base64
import numpy as np
from flask import Flask, request, jsonify, render_template,redirect,url_for
from tensorflow.keras.models import load_model # type: ignore
from werkzeug.utils import secure_filename
import cv2
import tensorflow as tf
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
CORS(app)
# Path to upload folders
UPLOAD_FOLDER = 'uploads'
COLORIZE_FOLDER = 'colorize/images'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['COLORIZE_FOLDER'] = COLORIZE_FOLDER

# Ensure the folders exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
if not os.path.exists(COLORIZE_FOLDER):
    os.makedirs(COLORIZE_FOLDER)

# Load the trained food classification model
food_model = load_model('Happy_Sad_Classifier.keras')

def run_colorizer(image_path):
    # Use your colorizer code logic here to process the image
    DIR = r"C:/Users/HP/Desktop/ML-miniProject/colorize"
    PROTOTXT = os.path.join(DIR, "model", "colorization_deploy_v2.prototxt")
    POINTS = os.path.join(DIR, "model", "pts_in_hull.npy")
    MODEL = os.path.join(DIR, "model", "colorization_release_v2.caffemodel")

    net = cv2.dnn.readNetFromCaffe(PROTOTXT, MODEL)
    pts = np.load(POINTS)

    class8 = net.getLayerId("class8_ab")
    conv8 = net.getLayerId("conv8_313_rh")
    pts = pts.transpose().reshape(2, 313, 1, 1)
    net.getLayer(class8).blobs = [pts.astype("float32")]
    net.getLayer(conv8).blobs = [np.full([1, 313], 2.606, dtype="float32")]

    image = cv2.imread(image_path)
    scaled = image.astype("float32") / 255.0
    lab = cv2.cvtColor(scaled, cv2.COLOR_BGR2LAB)
    resized = cv2.resize(lab, (224, 224))
    L = cv2.split(resized)[0]
    L -= 50

    net.setInput(cv2.dnn.blobFromImage(L))
    ab = net.forward()[0, :, :, :].transpose((1, 2, 0))
    ab = cv2.resize(ab, (image.shape[1], image.shape[0]))
    L = cv2.split(lab)[0]
    colorized = np.concatenate((L[:, :, np.newaxis], ab), axis=2)
    colorized = cv2.cvtColor(colorized, cv2.COLOR_LAB2BGR)
    colorized = np.clip(colorized, 0, 1)
    colorized = (255 * colorized).astype("uint8")

    return colorized


    
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
    



# Load the colorization model
DIR = r"colorize"
PROTOTXT = os.path.join(DIR, "model", "colorization_deploy_v2.prototxt")
POINTS = os.path.join(DIR, "model", "pts_in_hull.npy")
MODEL = os.path.join(DIR, "model", "colorization_release_v2.caffemodel")
color_net = cv2.dnn.readNetFromCaffe(PROTOTXT, MODEL)
pts = np.load(POINTS)
class8 = color_net.getLayerId("class8_ab")
conv8 = color_net.getLayerId("conv8_313_rh")
pts = pts.transpose().reshape(2, 313, 1, 1)
color_net.getLayer(class8).blobs = [pts.astype("float32")]
color_net.getLayer(conv8).blobs = [np.full([1, 313], 2.606, dtype="float32")]

# Route for home page
@app.route('/')
def home():
    return render_template('index.html')  # Home page with navigation

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
@app.route('/colorize', methods=['POST'])
def colorize_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Run your model (this is your provided colorize.py code wrapped as a function)
    colorized_image = run_colorizer(file_path)

    # Encode the colorized image to base64 to send it as a JSON response
    _, buffer = cv2.imencode('.jpg', colorized_image)
    colorized_image_b64 = base64.b64encode(buffer).decode('utf-8')

    return jsonify({'colorizedImage': colorized_image_b64})

if __name__ == '__main__':
    app.run(debug=True)
