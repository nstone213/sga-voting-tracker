import React from "react";
import "./FinalVotes.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const FinalVotes = ({ votes }) => {
  return (
    <>
      <div className="results-modal">
        <div className="votes-container">
          {Object.entries(votes).map(([uid, data]) => (
            <div key={uid} className={`vote-box ${data.vote}`} title={data.name}></div>
          ))}
        </div>
        <button className="expand-button">
          <i className="fas fa-expand"></i>
        </button>
      </div>
    </>
  );
};

export default FinalVotes;