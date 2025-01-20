import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig/firebaseConfig";
import "./RollCall.css"; // Ensure you create a corresponding CSS file for styling
import "@fortawesome/fontawesome-free/css/all.min.css";

const RollCall = () => {
  const [loggedInUsers, setLoggedInUsers] = useState([]);

  // Predefined list of names to check against
  const predefinedNames = ["as, aS", "DeBord, Wyatt", "Charlie Lee", "Dana White"];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        if (doc.data().name) {
          users.push(doc.data().name);
        }
      });
      setLoggedInUsers(users);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="rollcall-container">
      <div className="rollcall-header">
        <p className="rollcall-title">Roll Call</p>
        <button className="information-button">
          <i className="fas fa-circle-info"></i>
        </button>
      </div>

      <ul>
        {predefinedNames.map((name) => (
          <li key={name} className={loggedInUsers.includes(name) ? "active-user" : ""}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RollCall;