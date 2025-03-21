import { useRef, useState, useEffect } from "react";

const Recording = () => {
  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoURL, setRecordedVideoURL] = useState(null);
  const [stream, setStream] = useState(null);

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

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

  const startRecording = () => {
    if (!stream) return;

    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    mediaRecorder.onstop = ()   => {
      const recordedBlob = new Blob(chunks, { type: "video/webm" });
      const videoURL = URL.createObjectURL(recordedBlob);
      setRecordedVideoURL(videoURL);
      setIsRecording(false);
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
      <h2 className="text-4xl font-bold text-gray-700 mb-6 drop-shadow-md tracking-wide mt-10 p-9">
        🎥 Sign Language Encoding
      </h2>

      {/* Video Card */}
      <div className="w-full max-w-2xl bg-white/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-gray-200">
        <div className="relative w-full aspect-video border border-gray-300 rounded-xl overflow-hidden shadow-lg">
          {isCameraOn ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full"></video>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500 text-lg">
              📷 Webcam Off
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          {!isCameraOn && !recordedVideoURL && (
            <button
              onClick={startWebcam}
              className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition-all hover:scale-105"
            >
              Start Webcam
            </button>
          )}

          {isCameraOn && (
            <>
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="bg-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-green-600 transition-all hover:scale-105"
                >
                  🎬 Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-red-600 transition-all hover:scale-105"
                >
                  ⏹ Stop Recording
                </button>
              )}
              <button
                onClick={stopWebcam}
                className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-gray-600 transition-all hover:scale-105"
              >
                ✖ Stop Webcam
              </button>
            </>
          )}
        </div>
      </div>

      {/* Recorded Video Section */}
      {recordedVideoURL && (
        <div className="w-full max-w-2xl mt-6 bg-white/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">🎥 Recorded Video</h3>
          <video
            ref={recordedVideoRef}
            src={recordedVideoURL}
            controls
            className="w-full h-auto border border-gray-300 rounded-xl shadow-lg"
          ></video>
        </div>
      )}
    </div>
  );
};

export default Recording;
