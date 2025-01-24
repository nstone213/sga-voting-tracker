// Home.js
import React, { useEffect, useState } from "react";
import VotingConsole from "../../components/votingConsole/VotingConsole";
import UserInfo from "../../components/userinfo/UserInfo";
import Links from "../../components/links/Links";
import ToggleSwitch from "../../components/links/toggleswitch/ToggleSwitch";
import { auth, db } from "../../components/firebaseconfig/firebaseConfig";
import { doc, getDoc, onSnapshot, collection, setDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Loader from "../../components/loader/Loader";

function Home() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [votes, setVotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
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
    <div className={`container ${isDarkMode ? "dark-container" : ""}`}>
      <div className="toggle-container">
        <ToggleSwitch isOn={isDarkMode} handleToggle={handleToggleDarkMode} />
      </div>
      {submitted && (
        <UserInfo name={name} user={user} handleSignOut={handleSignOut} isDarkMode={isDarkMode} />
      )}
        <VotingConsole user={user} votes={votes} handleVote={handleVote} />
      <Links isDarkMode={isDarkMode} />
    </div>
  );
}

export default Home;