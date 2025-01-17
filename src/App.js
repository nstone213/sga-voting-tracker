import React, { useState, useEffect } from 'react';
import './App.css';

function Login({ setName, navigateToVoter }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      setName(username);
      localStorage.setItem('username', username);
      navigateToVoter();
    } else {
      alert('Please enter your name!');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">Submit</button>
    </div>
  );
}

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

function Results({ vote, clearVote }) {
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
      <button className="clear-button" onClick={clearVote}>Clear</button>
    </div>
  );
}

function App() {
  const [vote, setVote] = useState(null);
  const [username, setUsername] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const savedVote = localStorage.getItem('vote');
    if (savedVote) {
      setVote(savedVote);
    }

    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const navigateToResults = () => {
    setShowResults(true);
  };

  const navigateToVoter = () => {
    setShowResults(false);
  };

  const clearVote = () => {
    setVote(null);
    localStorage.removeItem('vote');
  };

  return (
    <div className="app">
      {username ? (
        showResults ? (
          <Results vote={vote} clearVote={clearVote} />
        ) : (
          <VoterInterface setVote={setVote} navigateToResults={navigateToResults} />
        )
      ) : (
        <Login setName={setUsername} navigateToVoter={navigateToVoter} />
      )}
      {showResults && username && <button className="back" onClick={navigateToVoter}>Back</button>}
    </div>
  );
}

export default App;