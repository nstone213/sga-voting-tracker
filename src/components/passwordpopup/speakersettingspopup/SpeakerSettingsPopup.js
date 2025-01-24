import React, { useState } from "react";
import "./SpeakerSettingsPopup.css";

const SpeakerSettingsPopup = ({ closePopup }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="speaker-popup"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="speaker-header" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <span>Speaker Settings</span>
        <button className="close-button" onClick={closePopup}>X</button>
      </div>
      <div className="speaker-content">
        <p>Adjust your speaker settings here.</p>
      </div>
    </div>
  );
};

export default SpeakerSettingsPopup;