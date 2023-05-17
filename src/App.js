import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const getVideo = async () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 400, height: 400 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => console.log(err));
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="w-[399px] border border-10 border-black h-[399px] bg-black overflow-hidden rounded-xl mx-auto">
        <video ref={videoRef}></video>
      </div>
      <div className="text-center mt-4">
        <button
          onClick={takePhoto}
          className="bg-blue-400 px-3 py-2 font-semibold rounded"
        >
          SNAP!
        </button>
      </div>
      <div className="text-center mt-3">
        <p>Your picture would be displayed below after you snap!</p>
      </div>

      <div>
        <div className="w-[399px] border border-10 border-black  bg-black overflow-hidden rounded-xl mx-auto">
          <canvas ref={photoRef} className="object-cover"></canvas>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={closePhoto}
            className="bg-red-400 px-3 py-2 font-semibold rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
