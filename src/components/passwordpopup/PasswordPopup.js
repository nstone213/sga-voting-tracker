import React, { useState } from "react";
import "./PasswordPopup.css";

const PasswordPopup = ({ closePopup }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    alert(`Entered Password: ${password}`);
    closePopup(); // Close the popup after submission
  };

  return (
    <>
      <div className="popup-backdrop" onClick={closePopup}></div>
      <div className="popup-container">
        <h3>Enter Password</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <div className="popup-buttons">
          <button onClick={handleSubmit} className="submit-button">Submit</button>
          <button onClick={closePopup} className="cancel-button">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default PasswordPopup;