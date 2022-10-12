import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecAudio from "./Pages/RecAudio/RecAudio";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecAudio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
