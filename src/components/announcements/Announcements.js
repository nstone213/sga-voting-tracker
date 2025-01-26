import React, { useState, useEffect } from "react";
import "./Announcements.css";
import { db } from "../firebaseconfig/firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Announcements = () => {
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "announcement"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const latest = snapshot.docs[0].data();
        setLatestAnnouncement({
          text: latest.text,
          timestamp: latest.timestamp?.toDate().toLocaleString(), // Formats timestamp
        });
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div className="announcements-container">
      <h3>Latest Announcement</h3>
      {latestAnnouncement ? (
        <div>
          <p>{latestAnnouncement.text}</p>
          <p className="timestamp">Posted on: {latestAnnouncement.timestamp}</p>
        </div>
      ) : (
        <p>No announcements yet.</p>
      )}
    </div>
  );
};

export default Announcements;