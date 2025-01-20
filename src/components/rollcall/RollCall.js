import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig/firebaseConfig";
import "./RollCall.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

const RollCall = () => {
  const [loggedInUsers, setLoggedInUsers] = useState([]);

  // Predefined list of names to check against
  const predefinedNames = ["as, aS", "DeBord, Wyatt", "Charlie Lee", "Dana White", "Pastula, Noah", "R., Dorian", "asdf", "SSSS", "JKLJ", 
    "New Name 1", "New Name 2", "New Name 3", "New Name 4", "New Name 5", "New Name 6", "New Name 7", "New Name 8", "New Name 9"]; // Added extra names for testing

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
        <div className="information-button-container">
            <button className="information-button">
                <i className="fas fa-circle-info"></i>
            </button>
            <span className="tooltip-text">HI!!</span>
        </div>
      </div>

      {/* Scrollable section for names */}
      <div className="names-container">
        <ul>
          {predefinedNames.map((name) => (
            <li key={name} className={loggedInUsers.includes(name) ? "active-user" : ""}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RollCall;