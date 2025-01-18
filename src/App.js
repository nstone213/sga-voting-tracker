import React, { useEffect, useState } from "react";
import { signInAnonymously, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc, onSnapshot, collection, deleteDoc } from "firebase/firestore";
import "./App.css";
import Loader from "./Loader";
import Results from "./Results";
import { auth, db } from "./firebaseConfig";

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [votes, setVotes] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      if (snapshot.empty) {
        console.warn("No documents found in Firestore.");
        setVotes({});
        return;
      }
      const updatedVotes = {};
      snapshot.forEach((doc) => {
        updatedVotes[doc.id] = doc.data();
      });
      setVotes(updatedVotes);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!name.trim()) return;
    try {
      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;
      setUser(userCredential.user);

      await setDoc(doc(db, "users", uid), {
        name: name,
        uid: uid,
        vote: "none",
        timestamp: new Date(),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

  const handleVote = async (uid, vote) => {
    if (!user || user.uid !== uid) return;
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, { vote: vote }, { merge: true });
  };

  const handleSignOut = async () => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await signOut(auth);
      setUser(null);
      setName("");
      setSubmitted(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      {submitted && name && <div className="user-name">{name}</div>}
      {submitted && <p className="user-id">User ID: {user?.uid}</p>}
      {submitted && (
        <>
          <button onClick={() => setShowResults(true)} className="results-button">
            Results
          </button>
          <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
          </button>
        </>
      )}
      <h1>UHR Voting System</h1>
      {!submitted ? (
        <div className="login-container">
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
        <div className="voting-container">
          {user?.uid && votes[user.uid] ? (
            <div className="vote-buttons">
              {["yay", "nay", "abstain"].map((option) => (
                <button
                  key={option}
                  className={`vote-button ${option} ${votes[user.uid].vote === option ? "selected" : ""}`}
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
      {showResults && <Results votes={votes} setShowResults={setShowResults} />}
    </div>
  );
}

export default App;