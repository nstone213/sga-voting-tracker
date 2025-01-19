import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot, collection, deleteDoc, setDoc } from "firebase/firestore";
import "./App.css";
import Loader from "./components/loader/Loader";
import Results from "./components/results/Results";
import VotingConsole from "./components/votingConsole/VotingConsole";
import SignIn from "./components/signin/SignIn";
import UserInfo from "./components/userinfo/UserInfo";
import Links from "./components/links/Links";
import ToggleSwitch from "./components/toggleswitch/ToggleSwitch";
import { auth, db } from "./components/firebaseconfig/firebaseConfig";

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [votes, setVotes] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

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
      {submitted && (
        <UserInfo name={name} user={user} handleSignOut={handleSignOut} setShowResults={setShowResults} />
      )}
      {!submitted ? (
        <SignIn setUser={setUser} setName={setName} setSubmitted={setSubmitted} />
      ) : (
        <VotingConsole user={user} votes={votes} handleVote={handleVote} />
      )}
      {showResults && <Results votes={votes} setShowResults={setShowResults} />}
      <Links/>
      <div style={{ padding: "20px" }}>
        <ToggleSwitch isOn={isOn} handleToggle={handleToggle} />
      </div>
    </div>
  );
}

export default App;