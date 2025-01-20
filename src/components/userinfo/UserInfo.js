import React, { useState } from "react";
import "./UserInfo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "../sidebar/Sidebar";
import PasswordPopup from "../passwordpopup/PasswordPopup"; // Import the new popup component

const UserInfo = ({ name, user, handleSignOut, setShowResults }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Function to close sidebar
  const closeSidebar = () => setIsSidebarVisible(false);

  // Function to open the password popup
  const openPopup = () => {
    setIsSidebarVisible(false); // Close sidebar
    setIsPopupVisible(true); // Show password popup
  };

  // Function to close the password popup
  const closePopup = () => setIsPopupVisible(false);

  return (
    <>
      <div className="user-info">
        <div className="user-details">
          {name && <div className="user-name">{name}</div>}
        </div>

        <div className="title">
          <h2>UHR Voting Dashboard</h2>
        </div>

        <div className="button-group">
          <button className="results-button">
            Results <i className="fas fa-check-to-slot"></i>
          </button>
          <button onClick={handleSignOut} className="sign-out-button">
            Sign Out <i className="fas fa-right-from-bracket"></i>
          </button>
          <button
            className="menu-button"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isSidebarVisible={isSidebarVisible} closeSidebar={closeSidebar} openPopup={openPopup} />

      {/* Password Popup */}
      {isPopupVisible && <PasswordPopup closePopup={closePopup} />}
    </>
  );
};

export default UserInfo;