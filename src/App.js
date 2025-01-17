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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
        onKeyPress={handleKeyPress}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">Submit</button>
    </div>
  );
}

function VoterInterface({ setVote, navigateToResults }) {
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
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emptyVoteMessage, setEmptyVoteMessage] = useState(false);

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

  const handlePasswordSubmit = () => {
    if (passwordInput === 'PASSWORD') {
      setVote(null);
      localStorage.removeItem('vote');
      setPasswordInput('');
      setPasswordError('');
      setShowPasswordPopup(false);
    } else {
      setPasswordError('Wrong password');
    }
  };

  const handlePasswordKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  const clearVote = () => {
    if (!vote) {
      setEmptyVoteMessage(true);
      setTimeout(() => {
        setEmptyVoteMessage(false);
      }, 1500);
    } else {
      setShowPasswordPopup(true);
    }
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

      {showPasswordPopup && (
        <div className="password-popup">
          <h2>Enter Password</h2>
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyPress={handlePasswordKeyPress}
            className="password-input"
          />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
          <button onClick={handlePasswordSubmit} className="submit-button">Submit</button>
        </div>
      )}

      {emptyVoteMessage && (
        <div className="empty-vote-message" onClick={() => setEmptyVoteMessage(false)}>
          <p style={{ color: 'red' }}>Voting records are empty</p>
        </div>
      )}
    </div>
  );
}

export default App;
