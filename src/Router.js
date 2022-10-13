import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecAudio from "./Pages/RecAudio/RecAudio";

import Audio from "./Pages/RecAudio/testAudiomodule";
import PlayAudio from "./Pages/PlayAudio/PlayAudio";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecAudio />} />
        <Route path="/test" element={<Audio />} />
        <Route path="/play" element={<PlayAudio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
