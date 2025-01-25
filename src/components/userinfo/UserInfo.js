import React, { useState } from "react";
import "./UserInfo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "../sidebar/Sidebar";
import PasswordPopup from "../passwordpopup/PasswordPopup"; // Import the new popup component
import gtPoliTechslogo from "../assets/gtPoliTechslogo.png"; // Ensure the correct path to your image
import SpeakerSettingsPopup from "../passwordpopup/speakersettingspopup/SpeakerSettingsPopup";


const UserInfo = ({ name, isDarkMode, handleSignOut }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showSpeakerSettings, setShowSpeakerSettings] = useState(false);

  // Function to close sidebar
  const closeSidebar = () => setIsSidebarVisible(false);

  // Function to open the password popup
  const openPopup = () => {
    setIsSidebarVisible(false); // Close sidebar
    setIsPopupVisible(true); // Show password popup
  };

  // Function to close the password popup
  const closePopup = () => {
    setIsPopupVisible(false);
    setShowSpeakerSettings(true);
  };

  return (
    <>
      <div className={`user-info ${isDarkMode ? "dark-user-info" : ""}`}>
        <div className="user-details">
          {name && <div className="user-name">{name}</div>}
        </div>

        <div className="title">
          <img src={gtPoliTechslogo} alt="gtPoliTechs Logo" className="gtPoliTechslogo" />
        </div>

        <div className="button-group">
          <button
            className="menu-button"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isSidebarVisible={isSidebarVisible} closeSidebar={closeSidebar} openPopup={openPopup} handleSignOut={handleSignOut} />

      {/* Password Popup */}
      {isPopupVisible && <PasswordPopup closePopup={closePopup} />}
      {showSpeakerSettings && <SpeakerSettingsPopup closePopup={() => setShowSpeakerSettings(false)} />}
    </>
  );
};

export default UserInfo;