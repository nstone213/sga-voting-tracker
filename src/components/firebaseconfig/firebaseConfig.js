// Import necessary Firebase dependencies
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
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

export { app, auth, db };