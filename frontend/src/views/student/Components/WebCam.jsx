import React, { useEffect, useRef } from "react";

const WebCam = ({ startCamera, onViolation }) => {
  const videoRef = useRef(null);
  let violationCount = 0;

  // 🎥 CAMERA START
  useEffect(() => {
    if (!startCamera) return;

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        alert("Camera permission required");
      }
    };

    initCamera();
  }, [startCamera]);

  // 🚨 TAB SWITCH
  useEffect(() => {
    const handleTab = () => {
      if (document.hidden) {
        violationCount++;
        onViolation(violationCount);
      }
    };

    document.addEventListener("visibilitychange", handleTab);
    return () =>
      document.removeEventListener("visibilitychange", handleTab);
  }, []);

  // 🚨 FULLSCREEN EXIT
  useEffect(() => {
    const handleFullscreen = () => {
      if (!document.fullscreenElement) {
        violationCount++;
        onViolation(violationCount);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreen);
    return () =>
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreen
      );
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      style={{ display: "none" }}
    />
  );
};

export default WebCam;