import React from "react";
import "./UserInfo.css";

const UserInfo = ({ name, user, handleSignOut, setShowResults }) => {
  return (
    <div className="user-info">
      {name && <div className="user-name">{name}</div>}
      <p className="user-id">User ID: {user?.uid}</p>
      <button onClick={() => setShowResults(true)} className="results-button">
        Results
      </button>
      <button onClick={handleSignOut} className="sign-out-button">
        Sign Out
      </button>
    </div>
  );
};

export default UserInfo;