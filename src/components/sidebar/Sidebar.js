import React from "react";
import "./Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = ({ isSidebarVisible, closeSidebar }) => {
  return (
    <>
      {/* Backdrop: Only visible when sidebar is open */}
      <div
        className={`sidebar-backdrop ${isSidebarVisible ? "visible" : ""}`}
        onClick={closeSidebar} /* Close when clicking outside */
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarVisible ? "visible" : ""}`}>
        <p>HELLOOOOO</p>
      </div>
    </>
  );
};

export default Sidebar;
