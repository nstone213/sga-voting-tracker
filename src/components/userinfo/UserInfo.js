import React from "react";
import "./UserInfo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const UserInfo = ({ name, user, handleSignOut, setShowResults }) => {
  return (
    <div className="user-info">
      {name && <div className="user-name">{name}</div>}
      <p className="user-id">User ID: {user?.uid}</p>
      <button onClick={() => setShowResults(true)} className="results-button">
        <i className="fas fa-check-to-slot"></i>
      </button>
      <button onClick={handleSignOut} className="sign-out-button">
        <i className="fas fa-right-from-bracket"></i>
      </button>
    </div>
  );
};

export default UserInfo;