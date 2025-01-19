import React from "react";
import "./Results.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Results = ({ votes, setShowResults }) => {
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
        <button className="settings-button">
          <i className="fas fa-cog"></i>
        </button>
      </div>
    </>
  );
};

export default Results;