import React, { useState, useEffect } from "react";
import "./VotingConsole.css";
import FinalVotes from "../finalvotes/FinalVotes"; // Import FinalVotes

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
    <>
      <div className="results-container">
        <FinalVotes votes={votes} /> {/* Render FinalVotes here */}
      </div>
      <div className="voting-container">
        <div className="voting-details">
          <p>Voting in progress...</p>
          <p>xx:xx:xx</p>
        </div>
        <h2 className="bill-title">BILL TBD</h2> {/* Apply new class if needed */}

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

        <div className="submit-container">
          <button
            className="vote-button submit"
            onClick={submitVote}
            disabled={!selectedVote || isSubmitted}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default VotingConsole;