import React, { useEffect, useState } from "react";
import "./VoteButtons.css";

const VoteButtons = ({ user, handleVote }) => {
  const [selectedVote, setSelectedVote] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const savedVote = localStorage.getItem(`vote-${user?.uid}`);
    if (savedVote) {
      const { vote, submitted } = JSON.parse(savedVote);
      setSelectedVote(vote);
      setIsSubmitted(submitted);
    }
  }, [user?.uid]);

  const submitVote = () => {
    if (selectedVote && !isSubmitted) {
      handleVote(user.uid, selectedVote);
      localStorage.setItem(
        `vote-${user.uid}`,
        JSON.stringify({ vote: selectedVote, submitted: true })
      );
      setIsSubmitted(true);
    }
  };

  return (
    <div className="voting-container">
        <div className="voting-details">
            <p>asfjfjfffjf in progress...</p>
            <p>xx:xx:xx</p>
        </div>
        <h2 className="bill-title">BILL TBD</h2>
        <div className="vote-buttons">
        {['yay', 'nay', 'abstain'].map((option) => (
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
          <button className="vote-button submit" onClick={submitVote} disabled={!selectedVote || isSubmitted}>
            Submit
          </button>
        </div>
    </div>
  );
};

export default VoteButtons;