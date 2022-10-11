import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayAudio from "./Pages/PlayAudio/PlayAudio";
import RecAudio from "./Pages/RecAudio/RecAudio";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecAudio />} />
        <Route path="/playaudio" element={<PlayAudio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
