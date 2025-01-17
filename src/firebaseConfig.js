// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// Your Firebase configuration object
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
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, signInAnonymously };