import React, { useState } from "react";
import "./VotingConsole.css";

const VotingConsole = ({ user, votes, handleVote }) => {
  const [selectedVote, setSelectedVote] = useState(null); // Local state to store the vote before submission

  if (!user?.uid || !votes[user.uid]) {
    return <p>Loading your vote...</p>;
  }

  return (
    <div className="vote-buttons">
      {["yay", "nay", "abstain"].map((option) => (
        <button
          key={option}
          className={`vote-button ${option} ${selectedVote === option ? "selected" : ""}`}
          onClick={() => setSelectedVote(option)} // Store the selection locally
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
      
      <button
        className="vote-button submit"
        onClick={() => handleVote(user.uid, selectedVote)}
        disabled={!selectedVote} // Disable if no option is selected
      >
        Submit
      </button>
    </div>
  );
};

export default VotingConsole;