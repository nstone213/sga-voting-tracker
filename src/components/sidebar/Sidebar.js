import React from "react";
import "./Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = ({ handleSignOut, setShowResults }) => {

  return (
    <div className="sidebar">
        <p>HELLOOOOO</p>
        <button onClick={() => setShowResults(true)} className="results-button">
            Results <i className="fas fa-check-to-slot"></i>
        </button>
        <button onClick={handleSignOut} className="sign-out-button">
            Sign Out <i className="fas fa-right-from-bracket"></i>
        </button>
    </div>
  );
};

export default Sidebar;