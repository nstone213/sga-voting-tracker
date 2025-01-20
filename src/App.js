import React, { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot, collection, deleteDoc, setDoc } from "firebase/firestore";
import "./App.css";
import Loader from "./components/loader/Loader";
import VotingConsole from "./components/votingConsole/VotingConsole";
import SignIn from "./components/signin/SignIn";
import UserInfo from "./components/userinfo/UserInfo";
import Links from "./components/links/Links";
import { auth, db } from "./components/firebaseconfig/firebaseConfig";

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [votes, setVotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isTabClosing, setIsTabClosing] = useState(false);
  let signOutTimer = null; // Timer to delay sign-out

  // Memoize handleSignOut
  const handleSignOut = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Start a timer when the tab is hidden (potential close)
        setIsTabClosing(true);
        signOutTimer = setTimeout(async () => {
          if (isTabClosing) {
            await handleSignOut();
          }
        }, 2000); // Wait 2 seconds before sign-out
      } else {
        // If the user comes back quickly, cancel sign-out
        setIsTabClosing(false);
        clearTimeout(signOutTimer);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(signOutTimer);
    };
  }, [isTabClosing, handleSignOut]);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      {submitted && (
        <UserInfo name={name} user={user} handleSignOut={handleSignOut} />
      )}
      {!submitted ? (
        <SignIn setUser={setUser} setName={setName} setSubmitted={setSubmitted} />
      ) : (
        <VotingConsole user={user} votes={votes} handleVote={handleVote} />
      )}
      <Links/>
    </div>
  );
}

export default App;