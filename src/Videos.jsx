import React from "react";

const Videos = () => {
  const videoUrl = "https://www.dailymotion.com/embed/video/x9341y2";

  return (
    <div
      className="video-player"
      style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}
    >
      <iframe
        src={videoUrl}
        title="Dailymotion Video"
        width="100%"
        height="450px"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Videos;
