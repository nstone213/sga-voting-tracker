import React, { useState } from "react";
import "./Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = ({ isSidebarVisible, closeSidebar, openPopup }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleBackdropClick = () => {
    setIsClosing(true); // Start closing animation

    setTimeout(() => {
      setIsClosing(false); // Reset closing state
      closeSidebar(); // Actually hide the sidebar and backdrop
    }, 300); // Match the CSS transition duration
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`sidebar-backdrop ${
          isSidebarVisible || isClosing ? "visible" : ""
        } ${isClosing ? "closing" : ""}`}
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
      </div>
    </>
  );
};

export default Sidebar;