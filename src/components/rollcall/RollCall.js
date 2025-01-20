import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig/firebaseConfig";
import predefinedNames from "../predefinednames/PredefinedNames"; // Import the predefined names
import "./RollCall.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

const RollCall = () => {
  const [loggedInUsers, setLoggedInUsers] = useState([]);

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

      {/* Fixed footer in the bottom right */}
      <div className="rollcall-footer">
        <p>Quorum: --</p>
        <p>Total Members: --</p>
      </div>
    </div>
  );
};

export default RollCall;