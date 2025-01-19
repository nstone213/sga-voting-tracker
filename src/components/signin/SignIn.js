import React, { useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseconfig/firebaseConfig";
import "./SignIn.css"; // Optional CSS for styling

const SignIn = ({ setUser, setName, setSubmitted }) => {
  const [inputName, setInputName] = useState("");
  const [inputUsername, setInputUsername] = useState("");

  const handleLogin = async () => {
    if (!inputName.trim()) return;
    try {
      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;
      setUser(userCredential.user);
      setName(inputName);
      setSubmitted(true);

      await setDoc(doc(db, "users", uid), {
        name: inputName,
        uid: uid,
        vote: "none",
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <p>Enter your name to continue:</p>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="last name, first name"
        />
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="GT username"
        />
        <button className="loginsubmit" onClick={handleLogin} disabled={!inputName.trim()}>
          Submit
        </button>
      </div>
    </div>
  );  
};

export default SignIn;