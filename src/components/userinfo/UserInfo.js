import React, { useState } from "react";
import "./UserInfo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from '../sidebar/Sidebar';
import Results from '../results/Results';

const UserInfo = ({ name, handleSignOut }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showResults, setShowResults] = useState(false); // ✅ State for results modal

  return (
    <>
      <div className="user-info">
        <div className="user-details">
          {name && <div className="user-name">{name}</div>}
        </div>
        <button
          className="menu-button"
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Sidebar appears as an overlay */}
      {isSidebarVisible && (
        <Sidebar 
          handleSignOut={handleSignOut} 
          setShowResults={setShowResults} // ✅ Pass the function
        />
      )}

      {/* Show Results modal when needed */}
      {showResults && <Results votes={{}} setShowResults={setShowResults} />}
    </>
  );
};

export default UserInfo;
