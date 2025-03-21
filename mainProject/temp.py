import os
import cv2
import torch
from flask import Flask, Response, jsonify, render_template, request
from services.gemini_service import correct_sign_language
from services.speech_service import text_to_voice, voice_to_text

app = Flask(__name__)

# Load Model
MODEL_PATH = "/home/pranav/Documents/Projects/SignBuddy/best (3).pt"
CLASS_MAP = {0: "Help", 1: "Strong", 2: "good", 3: "stop", 4: "you"}

detected_words = []  # Store detected words
last_sentence = ""

# Load YOLOv5 model
if os.path.exists(MODEL_PATH):
    try:
        model = torch.hub.load("ultralytics/yolov5", "custom", path=MODEL_PATH, force_reload=True)
        print("✅ Model loaded successfully!")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        model = None
else:
    print(f"❌ Model file not found at: {MODEL_PATH}")
    model = None

def detect_sign_language(frame):
    global detected_words
    if model is None:
        return frame  # Skip detection if model is not loaded

    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = model(img_rgb)
    for det in results.xyxy[0]:
        class_id = int(det[5])
        class_name = CLASS_MAP.get(class_id, f"Class {class_id}")
        if class_name not in detected_words:
            detected_words.append(class_name)
    return frame

def generate_frames():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("❌ Error: Could not open video capture.")
        return

    while True:
        success, frame = cap.read()
        if not success:
            break
        frame = detect_sign_language(frame)
        _, buffer = cv2.imencode(".jpg", frame)
        yield (b"--frame\r\nContent-Type: image/jpeg\r\n\r\n" + buffer.tobytes() + b"\r\n")

    cap.release()
    cv2.destroyAllWindows()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/video_feed")
def video_feed():
    return Response(generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame")

@app.route("/get_words")
def get_words():
    global detected_words
    return jsonify({"words": detected_words})

@app.route("/convert_sentence", methods=["POST"])
def convert_sentence():
    global detected_words, last_sentence
    try:
        if not detected_words:
            return jsonify({"error": "No words detected"}), 400
        
        # Log detected words for debugging
        print(f"Detected Words: {detected_words}")
        
        # Call the correct_sign_language function
        sentence = correct_sign_language(" ".join(detected_words))
        
        # Log the generated sentence for debugging
        print(f"Generated Sentence: {sentence}")
        
        if not sentence or "Error" in sentence:
            return jsonify({"error": "Failed to generate sentence"}), 500
        
        last_sentence = sentence
        detected_words = []  # Reset detected words after conversion
        return jsonify({"sentence": last_sentence})
    
    except Exception as e:
        # Log the exception for debugging
        print(f"Error in convert_sentence: {str(e)}")
        return jsonify({"error": str(e)}), 500 

@app.route("/play_audio", methods=["POST"])
def play_audio():
    global last_sentence
    if not last_sentence:
        return jsonify({"error": "No sentence generated yet!"}), 400
    audio_path = text_to_voice(last_sentence)
    return jsonify({"audio": audio_path})

@app.route("/reset_words", methods=["POST"])
def reset_words():
    global detected_words
    detected_words = []
    return jsonify({"message": "Words reset successfully"}), 200

@app.route("/speech-to-text")
def speech_to_text():
    global detected_words
    text = voice_to_text()
    detected_words = text.split()
    return jsonify({"recognized_text": text})

if __name__ == "__main__":
    os.makedirs("static", exist_ok=True)  # Ensure audio storage exists
    app.run(debug=True, port=8082)

