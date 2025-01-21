import React, { useState, useEffect } from "react";
import "./VotingConsole.css";
import FinalVotes from "../finalvotes/FinalVotes";
import RollCall from "../rollcall/RollCall";
import VoteButtons from "../votebuttons/VoteButtons"; // Import the new component

const VotingConsole = ({ user, votes, handleVote }) => {
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
    handleVote(user.uid, selectedVote);
    setIsSubmitted(true);
    localStorage.setItem(
      `vote-${user.uid}`,
      JSON.stringify({ vote: selectedVote, submitted: true })
    );
  };

  if (!user?.uid || !votes[user.uid]) {
    return <p>Loading your vote...</p>;
  }

  return (
    <div className="voting-console">
      <RollCall />
      <div className="voting-section">
        <div>
          <FinalVotes votes={votes} />
        </div>
        <div className="voting-container">
          <VoteButtons
            selectedVote={selectedVote}
            setSelectedVote={setSelectedVote}
            isSubmitted={isSubmitted}
          />
  
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
      </div>
    </div>
  );  
};

export default VotingConsole;