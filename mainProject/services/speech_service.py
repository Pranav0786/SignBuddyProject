import os
import speech_recognition as sr
from gtts import gTTS

def text_to_voice(sentence):
    save_dir = "static"
    os.makedirs(save_dir, exist_ok=True)
    file_path = os.path.join(save_dir, "output.mp3")
    
    try:
        tts = gTTS(sentence, lang='en', slow=False)
        tts.save(file_path)
    except Exception as e:
        print(f"❌ Error saving TTS file: {e}")
    
    return file_path

def voice_to_text():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Speak something...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
    try:
        return recognizer.recognize_google(audio)
    except sr.UnknownValueError:
        return ""
    except sr.RequestError:
        return ""