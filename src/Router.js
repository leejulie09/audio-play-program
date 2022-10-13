import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecAudio from "./Pages/RecAudio/RecAudio";
import Audio from "./Pages/RecAudio/testAudiomodule";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecAudio />} />
        <Route path="/test" element={<Audio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
