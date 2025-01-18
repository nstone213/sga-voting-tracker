import React from "react";
import "./VotingConsole.css";

const VotingConsole = ({ user, votes, handleVote }) => {
  if (!user?.uid || !votes[user.uid]) {
    return <p>Loading your vote...</p>;
  }

  return (
    <div className="vote-buttons">
      {["yay", "nay", "abstain"].map((option) => (
        <button
          key={option}
          className={`vote-button ${option} ${votes[user.uid].vote === option ? "selected" : ""}`}
          onClick={() => handleVote(user.uid, option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default VotingConsole;