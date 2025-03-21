import { useState } from "react";
import axios from "axios";

const SpeechRecognitionApp = () => {
  const [recognizedText, setRecognizedText] = useState("Waiting for input...");
  const [matchedWords, setMatchedWords] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const startListening = async () => {
    setRecognizedText("🎤 Listening...");
    setMatchedWords([]);
    setIsListening(true);

    try {
      const response = await axios.post("http://localhost:3008/start_voice");
      console.log("Response:", response.data);
      if (response.data.recognized_text) {
        setRecognizedText(response.data.recognized_text);
        setMatchedWords(response.data.matched_words || []);
      } else {
        setRecognizedText("⚠️ No speech detected.");
      }
    } catch (error) {
      console.error("Error:", error);
      setRecognizedText("❌ Error occurred while listening.");
    } finally {
      setIsListening(false); // Reset listening state
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    try {
      await axios.post("http://localhost:3008/stop_voice");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Speech to Text</h1>
      <div className="flex space-x-4 mt-6">
        <button
          onClick={startListening}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition"
          disabled={isListening}
        >
          🎤 Start Listening
        </button>
        <button
          onClick={stopListening}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg transition"
          disabled={!isListening}
        >
          ⏹ Stop Listening
        </button>
      </div>
      <p className="mt-6 text-lg font-semibold text-gray-700">
        <strong>Recognized Text:</strong>{" "}
        <span className="text-blue-600">{recognizedText}</span>
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {matchedWords.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md transform hover:scale-105 transition"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.word}
                className="w-28 h-28 object-cover rounded-lg"
              />
            )}
            <p className="text-gray-700 font-semibold mt-2">{item.word}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeechRecognitionApp;