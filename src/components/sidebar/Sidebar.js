import React from "react";
import "./Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = ({ isSidebarVisible, closeSidebar, openPopup }) => {
  return (
    <>
      {/* Backdrop: Only visible when sidebar is open */}
      <div
        className={`sidebar-backdrop ${isSidebarVisible ? "visible" : ""}`}
        onClick={closeSidebar} /* Close when clicking outside */
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarVisible ? "visible" : ""}`}>
        <button className="speaker-settings-button" onClick={openPopup}>
          Speaker Settings
        </button>
        <p>HELLOOOOO</p>
      </div>
    </>
  );
};

export default Sidebar;