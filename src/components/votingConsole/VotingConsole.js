import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./VotingConsole.css";
import FinalVotes from "../finalvotes/FinalVotes";
import RollCall from "../rollcall/RollCall";
import VoteButtons from "../votebuttons/VoteButtons"; // Import the new component
import Agenda from "../agenda/Agenda";

const VotingConsole = ({ user, votes, handleVote }) => {
  const [selectedVote, setSelectedVote] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initialize countdown
  const navigate = useNavigate(); // React Router navigation

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

  // Redirect logic when user is not found
  useEffect(() => {
    if (!user?.uid || !votes[user.uid]) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        navigate("/"); // Redirect to Sign-In page
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [user, votes, navigate]);

  // Show countdown message and redirect when user is not found
  if (!user?.uid || !votes[user.uid]) {
    return (
      <div className="redirect-message">
        <p>You will be redirected in {countdown} seconds...</p>
      </div>
    );
  }
  

  return (
    <div className="voting-console">
      <Agenda />
      <RollCall />
      <div className="voting-section">
        <div>
          <FinalVotes votes={votes} />
        </div>
        <div>
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