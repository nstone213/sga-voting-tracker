import React, { useState, useEffect } from "react";
import "./VotingConsole.css";

const VotingConsole = ({ user, votes, handleVote }) => {
  const [selectedVote, setSelectedVote] = useState(null); // Local state for selected vote
  const [isSubmitted, setIsSubmitted] = useState(false); // Lock-in state

  // Load vote state from localStorage
  useEffect(() => {
    const savedVote = localStorage.getItem(`vote-${user?.uid}`);
    if (savedVote) {
      const { vote, submitted } = JSON.parse(savedVote);
      setSelectedVote(vote);
      setIsSubmitted(submitted);
    }
  }, [user?.uid]);

  const submitVote = () => {
    handleVote(user.uid, selectedVote);
    setIsSubmitted(true);
    // Save vote state to localStorage
    localStorage.setItem(
      `vote-${user.uid}`,
      JSON.stringify({ vote: selectedVote, submitted: true })
    );
  };

  if (!user?.uid || !votes[user.uid]) {
    return <p>Loading your vote...</p>;
  }

  return (
    <div className="vote-buttons">
      {["yay", "nay", "abstain"].map((option) => (
        <button
          key={option}
          className={`vote-button ${option} ${selectedVote === option ? "selected" : ""}`}
          onClick={() => !isSubmitted && setSelectedVote(option)} // Prevent changes if submitted
          disabled={isSubmitted} // Disable after submission
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
      
      <button
        className="vote-button submit"
        onClick={submitVote}
        disabled={!selectedVote || isSubmitted} // Disable if no selection or already submitted
      >
        Submit
      </button>
    </div>
  );
};

export default VotingConsole;