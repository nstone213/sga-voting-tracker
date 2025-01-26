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
        const latestDoc = snapshot.docs[0].data();

        console.log("Latest announcement from Firestore:", latestDoc); // Debugging log

        setLatestAnnouncement({
          text: latestDoc.text,
          timestamp: latestDoc.timestamp?.toDate().toLocaleString(),
          userName: latestDoc.userName || "Unknown User", // Ensure the correct field is used
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
          <p>
            <strong>{latestAnnouncement.userName}:</strong> {latestAnnouncement.text}
          </p>
          <p className="timestamp">Posted on: {latestAnnouncement.timestamp}</p>
        </div>
      ) : (
        <p>No announcements yet.</p>
      )}
    </div>
  );
};

export default Announcements;