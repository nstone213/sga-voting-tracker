import React, { useState } from "react";
import "./SpeakerSettingsPopup.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ConfigureBills from "./speakercomponents/configurebills/ConfigureBills";
import MakeAnnouncement from "./speakercomponents/makeannouncement/MakeAnnouncement";
import UpdateAgenda from "./speakercomponents/updateagenda/UpdateAgenda";

const SpeakerSettingsPopup = ({ closePopup }) => {
  const [activeTab, setActiveTab] = useState("configureBills");
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="speaker-popup"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="speaker-header" onMouseDown={handleMouseDown}>
        <span>Speaker Settings</span>
        <button className="exit-button" onClick={closePopup}>&times;</button>
      </div>
      
      {/* Tabs Navigation */}
      <div className="tabs-container">
        <div className={`tab ${activeTab === "configureBills" ? "active" : ""}`} onClick={() => setActiveTab("configureBills")}>
          Configure Bills
        </div>
        <div className={`tab ${activeTab === "makeAnnouncement" ? "active" : ""}`} onClick={() => setActiveTab("makeAnnouncement")}>
          Make Announcement
        </div>
        <div className={`tab ${activeTab === "updateAgenda" ? "active" : ""}`} onClick={() => setActiveTab("updateAgenda")}>
          Update Agenda
        </div>
      </div>
      
      <div className="tab-content">
        {activeTab === "configureBills" && (
          <ConfigureBills />
        )}
        
        {activeTab === "makeAnnouncement" && (
          <div>
            <h3>Make an Announcement</h3>
            <p>Coming soon: Enter your announcement details here.</p>
          </div>
        )}
        
        {activeTab === "updateAgenda" && (
          <div>
            <h3>Update Agenda</h3>
            <p>Coming soon: Modify your meeting agenda here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakerSettingsPopup;
