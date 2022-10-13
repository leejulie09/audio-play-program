import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecAudio from "./Pages/RecAudio/RecAudio";
import PlayAudio from "./Pages/PlayAudio/PlayAudio";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecAudio />} />
        <Route path="/play" element={<PlayAudio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
