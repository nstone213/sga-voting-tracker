import React, { useState } from "react";
import "./UserInfo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from '../sidebar/Sidebar';

const UserInfo = ({ name }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
      {isSidebarVisible && <Sidebar />}
    </>
  );
};

export default UserInfo;