import React, { useEffect, useRef, useState } from "react";
import "./Camera.css"; // You can style it separately

const Camera = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const [capturedImages, setCapturedImages] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("none");

  // Initialize camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        mediaStreamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };

    startCamera();

    // Cleanup on unmount
    return () => stopCamera();
  }, []);

  // Stop camera tracks
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  // Take photo
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Apply current filter
    ctx.filter = getComputedStyle(video).filter;
    ctx.drawImage(video, 0, 0);

    const imageDataUrl = canvas.toDataURL("image/png");

    const newImages = [...capturedImages, imageDataUrl];
    setCapturedImages(newImages);
    localStorage.setItem("capturedImages", JSON.stringify(newImages));
  };

  // Optional: restore previous photos
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("capturedImages")) || [];
    setCapturedImages(saved);
  }, []);

return (
  <div className="camera-ui w-full h-full flex flex-row gap-4 p-4 text-white font-medium">
    {/* 📸 LEFT: Camera Preview */}
    <div className="flex-grow basis-3/5 rounded-2xl overflow-hidden bg-black border border-white/10 shadow-md">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`w-full h-full object-cover ${selectedFilter}`}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>

    <div className="flex flex-col justify-between basis-2/5 gap-4">
      <div className="flex flex-col gap-4">
        <button
          onClick={takePhoto}
          className="camera-button bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg hover:scale-105 transition transform px-6 py-2 rounded-full text-white w-full"
        >
          Take Photo
        </button>

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-[#424141] hover:bg-white/20 transition-all w-full"
        >
          <option value="none">No Filter</option>
          <option value="grayscale">Grayscale</option>
          <option value="sepia">Sepia</option>
          <option value="invert">Invert</option>
          <option value="contrast">High Contrast</option>
          <option value="hue">Hue Rotate</option>
        </select>

        <button
          onClick={() => {
            stopCamera();
            onClose?.();
          }}
          className="camera-button bg-gradient-to-br from-red-500 to-pink-600 shadow-lg hover:scale-105 transition transform px-6 py-2 rounded-full text-white w-full"
        >
          ✖ Close
        </button>
      </div>

      {/* 🖼️ Gallery */}
      {capturedImages.length > 0 && (
        <div className="gallery flex gap-3 overflow-x-auto max-h-60 flex-wrap p-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
          {capturedImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`snap-${idx}`}
              className="h-24 rounded-xl border border-white/10 shadow-sm hover:scale-110 transition-transform duration-300"
            />
          ))}
        </div>
      )}
    </div>
  </div>
);



}

export default Camera;
