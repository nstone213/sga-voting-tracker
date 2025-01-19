import React from "react";
import "./UserInfo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
<<<<<<< HEAD
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
=======

const UserInfo = ({ name, user, handleSignOut, setShowResults }) => {
  return (
    <div className="user-info">
      <div className="user-details">
        {name && <div className="user-name">{name}</div>}
      </div>
      <button onClick={() => setShowResults(true)} className="results-button">
        Results <i className="fas fa-check-to-slot"></i>
      </button>
      <button onClick={handleSignOut} className="sign-out-button">
        Sign Out <i className="fas fa-right-from-bracket"></i>
      </button>
      <button className="sign-out-button">
        <i className="fas fa-bars"></i>
      </button>
    </div>
>>>>>>> parent of 09bb6b6 (Sidebar styling)
  );
};

export default UserInfo;
