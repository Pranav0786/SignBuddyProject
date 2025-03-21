from flask import Flask, jsonify, redirect
from flask_cors import CORS
import speech_recognition as sr
import pyttsx3
import threading

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

recognizer = sr.Recognizer()
engine = pyttsx3.init()
is_listening = False
stop_listening_flag = False

# Dictionary of words and their corresponding image paths
word_map = {
    "hello": "static/images/hello.jpg",
    "how": "static/images/hello.jpg",
    "you": "static/images/hello.jpg",
}

def speak_text(text):
    """Convert text to speech."""
    engine.say(text)
    engine.runAndWait()

def recognize_speech():
    """Continuously capture voice input and convert it to text."""
    global is_listening, stop_listening_flag
    is_listening = True
    stop_listening_flag = False

    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source, duration=0.5)
        print("Listening...")
        while not stop_listening_flag:
            try:
                audio = recognizer.listen(source, timeout=5)
                text = recognizer.recognize_google(audio).lower()
                print(f"Recognized Text: {text}")

                # Convert recognized text to speech
                speak_text(text)

                # Check each word in the recognized text against the word_map
                matched_words = []
                for word in text.split():
                    matched_words.append({
                        "word": word,
                        "image": word_map.get(word),  # Use `.get()` to handle missing keys
                    })

                return {"recognized_text": text, "matched_words": matched_words}

            except sr.WaitTimeoutError:
                print("No speech detected. Listening again...")
                continue
            except sr.UnknownValueError:
                print("Could not understand audio. Listening again...")
                continue
            except sr.RequestError:
                print("API request failed. Please check your internet connection.")
                return {"recognized_text": "API request failed.", "matched_words": []}
            except Exception as e:
                print(f"Error: {e}")
                return {"recognized_text": "An error occurred.", "matched_words": []}

    is_listening = False
    return {"recognized_text": "Listening stopped.", "matched_words": []}

@app.route('/')
def index():
    return redirect("http://localhost:5173/voicetosign")

@app.route('/start_voice', methods=['POST'])
def start_voice():
    """Start voice recognition."""
    global is_listening
    if not is_listening:
        result = recognize_speech()
        return jsonify(result)
    return jsonify({"error": "Already listening."})

@app.route('/stop_voice', methods=['POST'])
def stop_voice():
    """Stop voice recognition."""
    global stop_listening_flag
    stop_listening_flag = True
    return jsonify({"message": "Voice recognition stopped."})

if __name__ == "__main__":
    app.run(debug=True, port=3008)