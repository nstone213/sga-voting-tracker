import React, { useState } from "react";
import "./MakeAnnouncement.css";
import { db } from "../../../../firebaseconfig/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const MakeAnnouncement = () => {
  const [announcement, setAnnouncement] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!announcement.trim()) return;

    try {
      await addDoc(collection(db, "announcement"), {
        text: announcement,
        timestamp: serverTimestamp(), // Stores time of submission
      });
      setAnnouncement(""); // Clears input field
    } catch (error) {
      console.error("Error adding announcement: ", error);
    }
  };

  return (
    <div>
      <h3>Make an Announcement</h3>
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