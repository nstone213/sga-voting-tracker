import React, { useEffect, useState } from "react";
import { db } from "../../components/firebaseconfig/firebaseConfig"; // Ensure the correct Firebase import
import { doc, getDoc } from "firebase/firestore";
import "./VoteButtons.css";

const VoteButtons = ({ user, handleVote }) => {
  const [selectedVote, setSelectedVote] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [billTitle, setBillTitle] = useState("Bill TBD");

  useEffect(() => {
    // Retrieve saved vote from localStorage
    const savedVote = localStorage.getItem(`vote-${user?.uid}`);
    if (savedVote) {
      const { vote, submitted } = JSON.parse(savedVote);
      setSelectedVote(vote);
      setIsSubmitted(submitted);
    }
  }, [user?.uid]);

  useEffect(() => {
    // Fetch the bill title from Firebase
    const fetchBillTitle = async () => {
      try {
        const billDoc = await getDoc(doc(db, "speakerinfo", "bill"));
        if (billDoc.exists()) {
          setBillTitle(billDoc.data().name || "Bill TBD");  // <-- Updated this line
        } else {
          setBillTitle("Bill TBD");
        }
      } catch (error) {
        console.error("Error fetching bill title:", error);
        setBillTitle("Bill TBD");
      }
    };    

    fetchBillTitle();
  }, []);

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
        <p>Voting in progress...</p>
        <p>xx:xx:xx</p>
      </div>
      <h2 className="bill-title">{billTitle}</h2>
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