// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Firebase configuration (replace with your own config from Firebase Console)
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

  const handleLogin = async () => {
    if (!name.trim()) return;
    try {
      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;
      setUser(userCredential.user);
      
      await setDoc(doc(db, "users", uid), {
        name: name,
        uid: uid,
        timestamp: new Date()
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', position: 'relative' }}>
      {submitted && name && (
        <div style={{ position: 'absolute', top: '10px', left: '10px', fontWeight: 'bold' }}>
          {name}
        </div>
      )}
      <h1>React + Firebase Anonymous Auth</h1>
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
        </div>
      )}
    </div>
  );
}

export default App;
