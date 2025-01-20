import React, { useState } from "react";
import "./Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = ({ isSidebarVisible, closeSidebar, openPopup }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleBackdropClick = () => {
    setIsClosing(true); // Start closing animation
  
    setTimeout(() => {
      closeSidebar(); // Hide sidebar after animation completes
      setIsClosing(false); // Reset state after animation
    }, 300); // Ensure this matches the transition duration in CSS
  };
  

  return (
    <>
      {/* Backdrop */}
      <div
        className={`sidebar-backdrop ${
          isSidebarVisible || isClosing ? "visible" : ""
        }`}
        onClick={handleBackdropClick}
      ></div>

      {/* Sidebar */}
      <div
        className={`sidebar ${
          isSidebarVisible ? "visible" : ""
        } ${isClosing ? "closing" : ""}`}
      >
        <button className="speaker-settings-button" onClick={openPopup}>
          Speaker Settings
        </button>
        <p>HELLOOOOO</p>
      </div>
    </>
  );
};

export default Sidebar;