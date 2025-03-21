from flask import Flask, render_template, jsonify
import speech_recognition as sr
import pyttsx3

app = Flask(__name__)
recognizer = sr.Recognizer()
engine = pyttsx3.init()
is_listening = False  # Flag to track listening state

# Dictionary of words and their corresponding image paths
word_map = {
    "hello": "static/images/hello.jpg",
    "how": "static/images/hello.jpg",
    "you": "static/images/hello.jpg"
}

def speak_text(text):
    """Convert text to speech."""
    engine.say(text)
    engine.runAndWait()

def recognize_speech():
    """Capture voice input and convert it to text."""
    global is_listening
    is_listening = True
    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source, duration=0.5)
        print("Listening...")
        try:
            audio = recognizer.listen(source, timeout=5)
            text = recognizer.recognize_google(audio).lower()
            print(f"Recognized Text: {text}")

            # Convert recognized text to speech
            speak_text(text)

            # Check each word in the recognized text against the word_map
            matched_words = []
            for word in text.split():
                if word in word_map:
                    matched_words.append({"word": word, "image": word_map[word]})
                else:
                    matched_words.append({"word": word, "image": None})  # No image for unmatched words

            return {"recognized_text": text, "matched_words": matched_words}
        
        except sr.WaitTimeoutError:
            return {"recognized_text": "No speech detected! Please try again.", "matched_words": []}
        except sr.UnknownValueError:
            return {"recognized_text": "Sorry, I couldn't understand that.", "matched_words": []}
        except sr.RequestError:
            return {"recognized_text": "Could not request results, please check your internet connection.", "matched_words": []}
        finally:
            is_listening = False  # Reset the listening flag

@app.route('/')
def index():
    return render_template('return.html')

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
    global is_listening
    is_listening = False
    return jsonify({"message": "Voice recognition stopped."})

if __name__ == "__main__":
    app.run(debug=True, port=3008)