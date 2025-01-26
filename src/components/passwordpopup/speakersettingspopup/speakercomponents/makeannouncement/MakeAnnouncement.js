import React, { useState, useEffect } from "react";
import "./MakeAnnouncement.css";
import { db } from "../../../../firebaseconfig/firebaseConfig";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const MakeAnnouncement = () => {
  const [announcement, setAnnouncement] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid); // Reference to user in Firestore
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser({
            uid: currentUser.uid,
            displayName: userSnap.data().name || currentUser.displayName || "Unknown User", // Ensure we get the name
          });
        } else {
          setUser({
            uid: currentUser.uid,
            displayName: currentUser.displayName || "Unknown User", // Fallback if no name found
          });
        }
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!announcement.trim() || !user || !user.displayName) return;

    try {
      await addDoc(collection(db, "announcement"), {
        text: announcement,
        timestamp: serverTimestamp(),
        userName: user.displayName, // Ensure correct field is stored
      });
      setAnnouncement(""); // Clears input field
    } catch (error) {
      console.error("Error adding announcement: ", error);
    }
  };

  return (
    <div>
      <h3>Make an Announcement</h3>
      {user ? <p>Posting as: {user.displayName}</p> : <p>Loading user...</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          placeholder="Enter your announcement"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;