// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection } from 'firebase/firestore';

// Firebase configuration (replace with your own Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyBy5ohxm1S0RNBFmdZLF3mblUrvrPPfvIQ",
  authDomain: "sga-voting-application.firebaseapp.com",
  projectId: "sga-voting-application",
  storageBucket: "sga-voting-application.firebasestorage.app",
  messagingSenderId: "590561514324",
  appId: "1:590561514324:web:f34408ff4064747695aec1",
  measurementId: "G-0EY4HZRQ23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set authentication persistence
setPersistence(auth, browserSessionPersistence).catch((error) => {
  console.error("Error setting persistence:", error);
});

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [votes, setVotes] = useState({}); // Store all users' votes
  const [showResults, setShowResults] = useState(false); // Toggle for results modal

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          setName(userDoc.data().name);
          setSubmitted(true);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Listen for vote updates in Firestore
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      if (snapshot.empty) {
        console.warn("No documents found in Firestore.");
        setVotes({});
        return;
      }

      const updatedVotes = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        updatedVotes[doc.id] = data;
      });

      setVotes(updatedVotes);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!name.trim()) return;
    try {
      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;
      setUser(userCredential.user);

      // Store user data in Firestore with a default vote state
      await setDoc(doc(db, "users", uid), {
        name: name,
        uid: uid,
        vote: "none", // Default vote
        timestamp: new Date()
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

  const handleVote = async (uid, vote) => {
    if (!user || user.uid !== uid) return; // Only allow the owner to vote

    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, { vote: vote }, { merge: true });
  };

  // Map vote types to colors
  const voteColors = {
    yay: "green",
    nay: "red",
    abstain: "yellow",
    none: "gray"
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', position: 'relative' }}>
      {/* Display user name in top left corner */}
      {submitted && name && (
        <div style={{ position: 'absolute', top: '10px', left: '10px', fontWeight: 'bold' }}>
          {name}
        </div>
      )}

      {/* Results button in top right corner */}
      {submitted && (
        <button 
          onClick={() => setShowResults(true)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '8px 15px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        >
          Results
        </button>
      )}

      <h1>React + Firebase Voting System</h1>

      {!submitted ? (
        <div>
          <p>Enter your name to continue:</p>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Your name" 
          />
          <button onClick={handleLogin} disabled={!name.trim()}>
            Submit
          </button>
        </div>
      ) : (
        <div>
          <p>Signed in as: {name}</p>
          <p>User ID: {user?.uid}</p>
          <p>Anonymous: {user?.isAnonymous ? 'Yes' : 'No'}</p>

          <h2>Your Vote</h2>
          {user?.uid && votes[user.uid] ? (
            <div>
              {["yay", "nay", "abstain"].map((option) => (
                <button
                  key={option}
                  style={{
                    backgroundColor: voteColors[option],
                    color: option === "abstain" ? "black" : "white",
                    padding: "10px 20px",
                    margin: "5px",
                    border: votes[user.uid].vote === option ? "3px solid black" : "none",
                    borderRadius: "10px", // Slightly rounded edges
                    cursor: "pointer",
                    fontSize: "16px"
                  }}
                  onClick={() => handleVote(user.uid, option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          ) : (
            <p>Loading your vote...</p>
          )}
        </div>
      )}

      {/* Results Modal */}
      {showResults && (
        <div style={{
          position: 'fixed',
          top: '15%',
          left: '15%',
          width: '70%',
          height: '70%',
          backgroundColor: 'white',
          boxShadow: '0px 0px 15px rgba(0,0,0,0.3)',
          padding: '20px',
          zIndex: 1000,
          borderRadius: '10px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Close Button */}
          <button 
            onClick={() => setShowResults(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              padding: '5px 10px',
              fontSize: '16px',
              border: 'none',
              backgroundColor: 'red',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '5px'
            }}
          >
            ✖
          </button>

          <h2>Voting Results</h2>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            padding: "10px"
          }}>
            {Object.entries(votes).map(([uid, data]) => (
              <div key={uid} style={{
                width: '50px',
                height: '50px',
                backgroundColor: voteColors[data.vote || "none"],
                display: 'inline-block',
                borderRadius: '5px'
              }} title={data.name}></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
