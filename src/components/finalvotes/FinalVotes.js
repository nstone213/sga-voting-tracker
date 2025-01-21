import React, { useState } from "react";
import "./FinalVotes.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const FinalVotes = ({ votes }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    document.body.classList.toggle("no-scroll", !isExpanded);
  };

  return (
    <>
      {isExpanded && <div className="overlay" onClick={toggleExpand}></div>}
      <div className={`results-modal ${isExpanded ? "expanded" : ""}`}>
        {isExpanded && (
          <button className="close-button" onClick={toggleExpand}>
            &times;
          </button>
        )}
        
        {/* Container for votes and summary */}
        <div className="expanded-content">
          <div className="votes-container">
            {Object.entries(votes).map(([uid, data]) => (
              <div
                key={uid}
                className={`vote-box ${data.vote}`}
                title={data.name}
              ></div>
            ))}
          </div>

          {isExpanded && (
            <div className="summary-box">
              <p>Summary of votes will go here...</p>
            </div>
          )}
        </div>

        {!isExpanded && (
          <button className="expand-button" onClick={toggleExpand}>
            <i className="fas fa-expand"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default FinalVotes;