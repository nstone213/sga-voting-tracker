import React, { useState } from "react";
import "./Results.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Results = ({ votes, setShowResults }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="modal-overlay" onClick={() => setShowResults(false)}></div>
      <div className="results-modal">
        <button onClick={() => setShowResults(false)} className="close-button">
          ✖
        </button>
        <div className="votes-container">
          {Object.entries(votes).map(([uid, data]) => (
            <div key={uid} className={`vote-box ${data.vote}`} title={data.name}></div>
          ))}
        </div>
        <button className="settings-button" onClick={() => setShowPasswordInput(!showPasswordInput)}>
          <i className="fas fa-cog"></i>
        </button>
        
        {/* Password input field appears when settings button is clicked */}
        {showPasswordInput && (
          <div className="password-container">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Results;