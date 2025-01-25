import React, { useState } from "react";
import { db } from "../../../components/firebaseconfig/firebaseConfig"; // Import Firebase config
import { doc, setDoc } from "firebase/firestore";
import "./SpeakerSettingsPopup.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SpeakerSettingsPopup = ({ closePopup, setBillDetails }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [billName, setBillName] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (!billName.trim()) {
      alert("Please enter a bill name before submitting.");
      return;
    }

    setLoading(true);

    try {
      // Save data to Firestore under "speakerinfo" collection
      await setDoc(doc(db, "speakerinfo", "bill"), { name: billName });
      await setDoc(doc(db, "speakerinfo", "time"), { minutes: sliderValue });

      // Update state in parent component (if provided)
      if (setBillDetails && typeof setBillDetails === "function") {
        setBillDetails({ name: billName, time: sliderValue });
      }

      // Close popup after saving data
      closePopup();
    } catch (error) {
      console.error("Error saving speaker info:", error);
      alert("Failed to save speaker info. Please try again.");
    } finally {
      setLoading(false);
    }
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
        <button className="exit-button" onClick={closePopup}>
            &times;
          </button>
      </div>
      <div className="speaker-content">
        <label htmlFor="bill-name">Bill Name:</label>
        <input
          type="text"
          id="bill-name"
          value={billName}
          onChange={(e) => setBillName(e.target.value)}
          className="bill-input"
          placeholder="Enter Bill Name"
        />
        
        <label htmlFor="time-slider">Time (minutes):</label>
        <input
          type="range"
          id="time-slider"
          min="0"
          max="30"
          step="5"
          value={sliderValue}
          onChange={(e) => setSliderValue(parseInt(e.target.value))}
          className="slider"
        />
        <span>{sliderValue} min</span>

        <button className="submit-button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default SpeakerSettingsPopup;