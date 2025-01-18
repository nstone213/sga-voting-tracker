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
  const [checkboxes, setCheckboxes] = useState({}); // Store all users' checkboxes

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
    // Listen for checkbox updates in Firestore
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      console.log("Firestore Snapshot Triggered"); // Debugging

      if (snapshot.empty) {
        console.warn("No documents found in Firestore.");
        setCheckboxes({});
        return;
      }

      const updatedCheckboxes = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        updatedCheckboxes[doc.id] = data;
      });

      console.log("Fetched checkboxes:", updatedCheckboxes); // Debugging
      setCheckboxes(updatedCheckboxes);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!name.trim()) return;
    try {
      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;
      setUser(userCredential.user);

      console.log("User signed in:", { uid, name }); // Debugging

      // Store user data in Firestore with a default checkbox state
      await setDoc(doc(db, "users", uid), {
        name: name,
        uid: uid,
        checked: false, // Default checkbox state
        timestamp: new Date()
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

  const handleCheckboxChange = async (uid) => {
    if (!user || user.uid !== uid) return; // Only allow the owner to change their checkbox

    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      await setDoc(userDocRef, { checked: !userDoc.data().checked }, { merge: true });
      console.log(`Checkbox for ${uid} updated to:`, !userDoc.data().checked); // Debugging
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', position: 'relative' }}>
      {submitted && name && (
        <div style={{ position: 'absolute', top: '10px', left: '10px', fontWeight: 'bold' }}>
          {name}
        </div>
      )}
      <h1>React + Firebase Anonymous Auth with Checkboxes</h1>

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

          <h2>Users & Checkboxes</h2>
          {Object.keys(checkboxes).length === 0 ? (
            <p>No users found. Please refresh the page or check Firestore.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {Object.entries(checkboxes).map(([uid, data]) => (
                <li key={uid} style={{ marginBottom: '10px' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={data.checked || false}
                      onChange={() => handleCheckboxChange(uid)}
                      disabled={user?.uid !== uid} // Disable checkbox for other users
                    />
                    {` ${data.name}`}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
