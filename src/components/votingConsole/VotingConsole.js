import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VotingConsole.css";
import FinalVotes from "../finalvotes/FinalVotes";
import RollCall from "../rollcall/RollCall";
import VoteButtons from "../votebuttons/VoteButtons";
import Agenda from "../agenda/Agenda";
import Announcements from "../announcements/Announcements";

const VotingConsole = ({ user, votes, handleVote }) => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  // New state for voting selection
  const [selectedVote, setSelectedVote] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!user?.uid || !votes[user.uid]) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [user, votes, navigate]);

  const submitVote = () => {
    if (selectedVote) {
      handleVote(user.uid, selectedVote);
      setIsSubmitted(true);
    }
  };

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
      <div className="middle-section">
        <div className="rollcall-section">
          <RollCall />
        </div>
        <div className="announcements-section">
          <Announcements />
        </div>
      </div>
      <div className="voting-section">
        <div>
          <FinalVotes votes={votes} />
        </div>
        <div>
          <VoteButtons 
            selectedVote={selectedVote} 
            setSelectedVote={setSelectedVote} 
            isSubmitted={isSubmitted} 
            user={user} 
            handleVote={handleVote} 
          />
        </div>
      </div>
    </div>
  );  
};

export default VotingConsole;