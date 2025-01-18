// src/Loader.js
import React from "react";
import "./Loader.css"; // Import CSS for animation

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;