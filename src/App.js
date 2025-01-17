import React, { useState, useEffect } from 'react';
import './App.css';

function Login({ setName, setGtid, navigateToVoter }) {
  const [username, setUsername] = useState('');
  const [gtid, setGtidInput] = useState('');

  const handleLogin = () => {
    if (username.trim() && gtid.trim()) {
      setName(username);
      setGtid(gtid);
      localStorage.setItem('username', username);
      localStorage.setItem('gtid', gtid);
      navigateToVoter();
    } else {
      alert('Please fill out both Name and GTID!');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
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
        onKeyDown={handleKeyPress}
      />
      <input
        type="text"
        placeholder="Enter your GTID"
        value={gtid}
        onChange={(e) => setGtidInput(e.target.value)}
        className="login-input"
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleLogin} className="login-button">Submit</button>
    </div>
  );
}

function VoterInterface({ setVote, navigateToResults, username }) {
  const [selectedVote, setSelectedVote] = useState(null);
  const [isVoteLocked, setIsVoteLocked] = useState(false);

  useEffect(() => {
    const savedVote = localStorage.getItem('vote');
    if (savedVote) {
      setIsVoteLocked(true);
      setSelectedVote(savedVote);
    }
  }, []);

  const handleVote = (vote) => {
    if (!isVoteLocked) {
      setSelectedVote(vote);
    }
  };

  const lockInVote = () => {
    if (!isVoteLocked && selectedVote) {
      setVote(selectedVote);
      localStorage.setItem('vote', selectedVote);
      setIsVoteLocked(true);
    } else if (!selectedVote) {
      alert('Please select a vote before locking in!');
    }
  };

  return (
    <div className="voter-interface">
      <div className="user-info">{username}</div>
      <h1>UHR Voting System</h1>
      <div className="button-group">
        <button
          className={`green ${selectedVote === 'yay' ? 'selected' : ''} ${isVoteLocked ? 'disabled' : ''}`}
          onClick={() => handleVote('yay')}
          disabled={isVoteLocked}
        >
          Yay
        </button>
        <button
          className={`red ${selectedVote === 'nay' ? 'selected' : ''} ${isVoteLocked ? 'disabled' : ''}`}
          onClick={() => handleVote('nay')}
          disabled={isVoteLocked}
        >
          Nay
        </button>
        <button
          className={`yellow ${selectedVote === 'abstain' ? 'selected' : ''} ${isVoteLocked ? 'disabled' : ''}`}
          onClick={() => handleVote('abstain')}
          disabled={isVoteLocked}
        >
          Abstain
        </button>
      </div>
      <button
        className="lock-in"
        style={{
          backgroundColor: isVoteLocked ? 'gray' : '',
          cursor: isVoteLocked ? 'not-allowed' : 'pointer',
        }}
        onClick={lockInVote}
        disabled={isVoteLocked}
      >
        Lock In
      </button>
      <button className="results" onClick={navigateToResults}>Results</button>
    </div>
  );
}

function Results({ vote, handleLogout }) {
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
      <button className="clear-button" onClick={handleLogout}>Log out</button>
    </div>
  );
}

function App() {
  const [vote, setVote] = useState(null);
  const [username, setUsername] = useState(null);
  const [gtid, setGtid] = useState(null);
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

    const savedGtid = localStorage.getItem('gtid');
    if (savedGtid) {
      setGtid(savedGtid);
    }
  }, []);

  const navigateToResults = () => {
    setShowResults(true);
  };

  const navigateToVoter = () => {
    setShowResults(false);
  };

  const handleLogout = () => {
    setUsername(null);
    setVote(null);
    setGtid(null);
    localStorage.removeItem('username');
    localStorage.removeItem('vote');
    localStorage.removeItem('gtid');
    setShowResults(false);
  };

  return (
    <div className="app">
      {username ? (
        showResults ? (
          <Results vote={vote} handleLogout={handleLogout} />
        ) : (
          <VoterInterface
            setVote={setVote}
            navigateToResults={navigateToResults}
            username={username}
          />
        )
      ) : (
        <Login setName={setUsername} setGtid={setGtid} navigateToVoter={navigateToVoter} />
      )}
    </div>
  );
}

export default App;
