import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Newapp = () => {
    const [words, setWords] = useState([]);
    const [sentence, setSentence] = useState("");
    const [videoUrl, setVideoUrl] = useState("http://localhost:8082/video_feed");
    
    // Recording States
    const videoRef = useRef(null);
    const recordedVideoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedVideoURL, setRecordedVideoURL] = useState(null);
    const [stream, setStream] = useState(null);

    // Fetch Detected Words
    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await axios.get("http://localhost:8082/get_words");
                setWords(response.data.words);
            } catch (error) {
                console.error("Error fetching words:", error);
            }
        };

        const interval = setInterval(fetchWords, 2000);
        return () => clearInterval(interval);
    }, []);

    // Start Webcam
    const startWebcam = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            setIsCameraOn(true);
        } catch (error) {
            console.error("Error accessing webcam:", error);
        }
    };

    // Stop Webcam
    const stopWebcam = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            setIsCameraOn(false);
        }
    };

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    // Start Recording
    const startRecording = () => {
        if (!stream) return;

        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const recordedBlob = new Blob(chunks, { type: "video/webm" });
            const videoURL = URL.createObjectURL(recordedBlob);
            setRecordedVideoURL(videoURL);
            setIsRecording(false);
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
    };

    // Stop Recording
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    // Convert Detected Words to Sentence
    const convertToSentence = async () => {
        try {
            const response = await axios.post("http://localhost:8082/convert_sentence");
            setSentence(response.data.sentence);
        } catch (error) {
            console.error("Error converting sentence:", error);
        }
    };

    // Play Converted Audio
    const playAudio = async () => {
        try {
            const response = await axios.post("http://localhost:8082/play_audio");
            if (response.data.audio) {
                const audio = new Audio(response.data.audio);
                audio.play();
            } else {
                console.error("No audio file returned from backend");
            }
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    };

    // Reset Words & Sentence
    const resetWords = async () => {
        try {
            await axios.post("http://localhost:8082/reset_words");
            setWords([]);
            setSentence("");
        } catch (error) {
            console.error("Error resetting words:", error);
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-8 mt-12  ">
            <h1 className="text-4xl font-bold text-indigo-900 mb-6 text-center">Sign Language Detection & Recording</h1>

            <div className="flex flex-col md:flex-row gap-12 w-full max-w-5xl bg-opacity-30">
                {/* Left: Sign Language Detection */}
                <div className="flex flex-col items-center w-full md:w-1/2 p-12 rounded-lg bg-blue-100">
                <div className="w-full  p-11 rounded-lg shadow-lg bg-white/10 backdrop-blur-lg">
                    
                    <h2 className="text-xl font-semibold text-indigo-600 mt-4">Detected Words:</h2>
                    <p className="bg-gray-100 border border-gray-300 p-3 rounded mt-2 shadow-sm text-gray-700 text-center">
                        {words.join(", ") || "No words detected yet"}
                    </p>

                    <button onClick={convertToSentence} className="mt-4 bg-orange-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all w-full shadow-md">
                        Convert to Sentence
                    </button>

                    <h2 className="text-xl mt-4 font-semibold text-indigo-600">Corrected Sentence:</h2>
                    <p className="bg-gray-100 border border-gray-300 p-3 rounded mt-2 shadow-sm text-gray-700 text-center">
                        {sentence || "No sentence yet"}
                    </p>

                    <div className="flex space-x-4 mt-4">
                        <button onClick={playAudio} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md">
                            🔊 Play Sentence
                        </button>
                        <button onClick={resetWords} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md">
                            ❌ Reset
                        </button>
                    </div>
                </div>
                </div>
                

                {/* Right: Webcam & Recording */}
                <div className="w-full md:w-1/2 flex flex-col items-center bg-blue-100 p-6 rounded-lg shadow-l bg-white/10 backdrop-blur-lg shadow-xs">
                    <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Live Detection</h2>

                    <img src={videoUrl} alt="Sign Language Detection" className="rounded-lg shadow-md border border-gray-300 w-full" />

                </div>
            </div>
        </div>
    );
};

export default Newapp;