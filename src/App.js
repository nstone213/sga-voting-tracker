import React, { useState, useEffect } from "react";
import "./App.css";
import { db, auth, signInAnonymously } from "./firebaseConfig";
import { collection, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Login Component
function Login({ setUser }) {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      signInAnonymously(auth)
        .then(() => {
          console.log("User signed in anonymously");
        })
        .catch((error) => {
          console.error("Error signing in", error);
        });
    } else {
      alert("Please enter your name!");
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
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Submit
      </button>
    </div>
  );
}

// Voting Interface Component
function VoterInterface({ user }) {
  const [selectedVote, setSelectedVote] = useState(null);
  const [isVoteLocked, setIsVoteLocked] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
  
    const fetchVote = async () => {
      try {
        const userVoteRef = doc(db, "votes", user.uid);
        const userVoteSnap = await getDoc(userVoteRef);
  
        if (userVoteSnap.exists()) {
          setSelectedVote(userVoteSnap.data().vote);
          setIsVoteLocked(true);
        }
      } catch (error) {
        console.error("Error fetching vote:", error);
      }
    };
  
    fetchVote();
  }, [user]); // Dependency changed from user.uid to user  

  const handleVote = (vote) => {
    if (!isVoteLocked) {
      setSelectedVote(vote);
    }
  };

  const lockInVote = async () => {
    if (selectedVote && !isVoteLocked) {
      await setDoc(doc(db, "votes", user.uid), { userId: user.uid, vote: selectedVote });
      setIsVoteLocked(true);
      setSelectedVote(selectedVote); // Force re-render
    } else {
      alert("Please select a vote before locking in!");
    }
  };  

  return (
    <div className="voter-interface">
      <h1>UHR Voting System</h1>
      <div className="button-group">
        <button
          className={`green ${selectedVote === "yay" ? "selected" : ""} ${isVoteLocked ? "disabled" : ""}`}
          onClick={() => handleVote("yay")}
          disabled={isVoteLocked}
        >
          Yay
        </button>
        <button
          className={`red ${selectedVote === "nay" ? "selected" : ""} ${isVoteLocked ? "disabled" : ""}`}
          onClick={() => handleVote("nay")}
          disabled={isVoteLocked}
        >
          Nay
        </button>
        <button
          className={`yellow ${selectedVote === "abstain" ? "selected" : ""} ${isVoteLocked ? "disabled" : ""}`}
          onClick={() => handleVote("abstain")}
          disabled={isVoteLocked}
        >
          Abstain
        </button>
      </div>
      <button className="lock-in" onClick={lockInVote} disabled={isVoteLocked}>
        Lock In
      </button>
    </div>
  );
}

// Results Component
function Results() {
  const [votes, setVotes] = useState({ yay: 0, nay: 0, abstain: 0 });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "votes"), (snapshot) => {
      const voteCounts = { yay: 0, nay: 0, abstain: 0 };
  
      snapshot.forEach((doc) => {
        const vote = doc.data().vote;
        if (voteCounts.hasOwnProperty(vote)) {
          voteCounts[vote]++;
        }
      });
  
      setVotes(voteCounts);
    });
  
    return () => unsubscribe();
  }, []);  

  return (
    <div className="results-overlay">
      <div className="results-popup">
        <h1>Vote Summary</h1>
        <p>✅ Yay: {votes.yay}</p>
        <p>❌ Nay: {votes.nay}</p>
        <p>⚖️ Abstain: {votes.abstain}</p>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // Only sign in anonymously if no user is detected
        signInAnonymously(auth)
          .then(({ user }) => setUser(user))
          .catch((error) => console.error("Error signing in anonymously", error));
      }
    });
  
    return () => unsubscribe();
  }, []);  

  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear username but keep Firebase session
    setUser(null);
  };  

  return (
    <div className="app">
      {user ? (
        <>
          <VoterInterface user={user} />
          <button className="results-button" onClick={() => setShowResults(true)}>
            Show Results
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
          {showResults && <Results />}
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;
