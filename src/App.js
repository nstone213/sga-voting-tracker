import React, { useState, useEffect } from 'react';
import './App.css';

function VoterInterface({ setVote, navigateToResults }) {
  const [selectedVote, setSelectedVote] = useState(null);

  const handleVote = (vote) => {
    setSelectedVote(vote);
  };

  const lockInVote = () => {
    if (selectedVote) {
      setVote(selectedVote);
      localStorage.setItem('vote', selectedVote);
    } else {
      alert('Please select a vote before locking in!');
    }
  };

  return (
    <div className="voter-interface">
      <h1>Voter Interface</h1>
      <div className="button-group">
        <button className="green" onClick={() => handleVote('yay')}>Yay</button>
        <button className="red" onClick={() => handleVote('nay')}>Nay</button>
        <button className="yellow" onClick={() => handleVote('abstain')}>Abstain</button>
      </div>
      <button className="lock-in" onClick={lockInVote}>Lock In</button>
      <button className="results" onClick={navigateToResults}>Results</button>
    </div>
  );
}

function Results({ vote }) {
  const getColor = () => {
    if (vote === 'yay') return 'green';
    if (vote === 'nay') return 'red';
    if (vote === 'abstain') return 'yellow';
    return 'gray';
  };

  return (
    <div className="results-page">
      <h1>Vote Summary</h1>
      <div className="vote-square" style={{ backgroundColor: getColor() }} />
    </div>
  );
}

function App() {
  const [vote, setVote] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const savedVote = localStorage.getItem('vote');
    if (savedVote) {
      setVote(savedVote);
    }
  }, []);

  const navigateToResults = () => {
    setShowResults(true);
  };

  const navigateToVoter = () => {
    setShowResults(false);
  };

  return (
    <div className="app">
      {showResults ? (
        <Results vote={vote} />
      ) : (
        <VoterInterface setVote={setVote} navigateToResults={navigateToResults} />
      )}
      {showResults && <button className="back" onClick={navigateToVoter}>Back</button>}
    </div>
  );
}

export default App;