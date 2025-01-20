import React from "react";
import "./VoteButtons.css";

const VoteButtons = ({ selectedVote, setSelectedVote, isSubmitted }) => {
  return (
    <>
        <div className="voting-details">
            <p>Voting in progress...</p>
            <p>xx:xx:xx</p>
        </div>
        <h2 className="bill-title">BILL TBD</h2>
        <div className="vote-buttons">
        {["yay", "nay", "abstain"].map((option) => (
            <button
            key={option}
            className={`vote-button ${option} ${selectedVote === option ? "selected" : ""}`}
            onClick={() => !isSubmitted && setSelectedVote(option)}
            disabled={isSubmitted}
            >
            {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
        ))}
        </div>
    </>
  );
};

export default VoteButtons;