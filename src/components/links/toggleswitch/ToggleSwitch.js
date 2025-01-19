import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ isOn, handleToggle, label }) => {
  return (
    <div className="toggle-container">
      <div className={`toggle-switch ${isOn ? "on" : "off"}`} onClick={handleToggle}>
        <div className="toggle-knob"></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;