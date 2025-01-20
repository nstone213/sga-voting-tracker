import React, { useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseconfig/firebaseConfig";
import "./SignIn.css"; // Optional CSS for styling

const SignIn = ({ setUser, setName, setSubmitted }) => {
  const [inputName, setInputName] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // Function to validate name format (Last, First)
  const isValidNameFormat = (name) => {
    return /^[A-Za-z]+, [A-Za-z]+$/.test(name.trim()); // Matches "Last, First"
  };

  const handleLogin = async () => {
    if (!isValidNameFormat(inputName)) {
      setErrorMessage("Name must be in Last Name, First Name format");
      setTimeout(() => setErrorMessage(""), 3000); // Hide error after 3 seconds
      return;
    }

    try {
      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;
      setUser(userCredential.user);
      setName(inputName);
      setSubmitted(true);

      await setDoc(doc(db, "users", uid), {
        name: inputName,
        username: inputUsername, // Store GT username as well
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
        <p>Login to continue:</p>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Last name, First name"
        />
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="GT username"
        />
        <button 
          className="loginsubmit" 
          onClick={handleLogin}
          disabled={!inputName.trim() || !inputUsername.trim()} // Disabled until both fields are filled
        >
          Submit
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      </div>
    </div>
  );  
};

export default SignIn;