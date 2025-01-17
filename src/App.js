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
        placeholder="Last, First"
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

function Results({ vote, clearVote, handleLogout, closeResults }) {
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const getColor = () => {
    if (vote === 'yay') return 'green';
    if (vote === 'nay') return 'red';
    if (vote === 'abstain') return 'yellow';
    return 'gray';
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === 'PASSWORD') { // Enforce password check
      clearVote(); // Reset vote when password matches
      setShowPasswordPopup(false);
      setPasswordInput('');
      setPasswordError('');
    } else {
      setPasswordError('Wrong password');
    }
  };

  return (
    <div className="results-overlay">
      <div className={`results-popup ${showPasswordPopup ? 'dimmed' : ''}`}>
        <button className="close-button" onClick={closeResults}>×</button>
        <h1>Vote Summary</h1>
        <div className="vote-square" style={{ backgroundColor: vote ? getColor() : 'white' }} />
        <button className="clear-button" onClick={() => setShowPasswordPopup(true)}>Clear</button>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>

      {showPasswordPopup && (
        <div className="password-overlay">
          <div className="password-popup">
            <button className="close-button" onClick={() => setShowPasswordPopup(false)}>×</button>
            <h2>Enter Password</h2>
            <input
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="password-input"
            />
            {passwordError && <p className="password-error">{passwordError}</p>}
            <button onClick={handlePasswordSubmit} className="submit-button">Submit</button>
          </div>
        </div>
      )}
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

  const clearVote = () => {
    setVote(null); // Reset vote in state
    localStorage.removeItem('vote'); // Remove vote from local storage
  };

  const navigateToResults = () => {
    setShowResults(true);
  };

  const closeResults = () => {
    setShowResults(false);
  };

  const handleLogout = () => {
    setUsername(null);
    setVote(null);
    localStorage.removeItem('username');
    localStorage.removeItem('vote');
    setShowResults(false);
  };

  return (
    <div className="app">
      {username ? (
        <>
          <VoterInterface setVote={setVote} navigateToResults={navigateToResults} />
          {showResults && (
            <Results
              vote={vote}
              clearVote={clearVote} // Ensure clearVote function is passed correctly
              handleLogout={handleLogout}
              closeResults={closeResults}
            />
          )}
        </>
      ) : (
        <Login setName={setUsername} navigateToVoter={closeResults} />
      )}
    </div>
  );
}

export default App