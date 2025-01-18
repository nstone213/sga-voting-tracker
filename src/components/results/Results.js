import React from "react";
import "./Results.css";

const Results = ({ votes, setShowResults }) => {
  return (
    <div className="results-modal">
      <button onClick={() => setShowResults(false)} className="close-button">
        ✖
      </button>
      {Object.entries(votes).map(([uid, data]) => (
        <div key={uid} className={`vote-box ${data.vote}`} title={data.name}></div>
      ))}
    </div>
  );
};

export default Results;
