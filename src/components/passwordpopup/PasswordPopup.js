import React, { useState } from "react";
import "./PasswordPopup.css";
import SpeakerSettingsPopup from "./speakersettingspopup/SpeakerSettingsPopup";

const PasswordPopup = ({ closePopup }) => {
  const [password, setPassword] = useState("");
  const [showSpeakerSettings, setShowSpeakerSettings] = useState(false);

  const handleSubmit = () => {
    if (password === "PASSWORD") {
      closePopup(); // Close PasswordPopup
      setShowSpeakerSettings(true); // Show SpeakerSettingsPopup
    } else {
      alert("Incorrect Password");
      setPassword(""); // Clear password field
    }
  };

  return (
    <>
      {!showSpeakerSettings && (
        <div className="popup-backdrop" onClick={closePopup}></div>
      )}
      {!showSpeakerSettings && (
        <div className="popup-container">
          <h3>Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <div className="popup-buttons">
            <button onClick={handleSubmit} className="submit-button">
              Submit
            </button>
            <button onClick={closePopup} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
      {showSpeakerSettings && <SpeakerSettingsPopup />}
    </>
  );
};

export default PasswordPopup;