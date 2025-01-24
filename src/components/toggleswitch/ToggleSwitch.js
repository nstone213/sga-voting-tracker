import React, { useEffect } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ isOn, handleToggle }) => {
  useEffect(() => {
    if (isOn) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isOn]);

  return (
    <div className="toggle-container">
      <div className={`toggle-switch ${isOn ? "on" : "off"}`} onClick={handleToggle}>
        <div className="toggle-knob"></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;