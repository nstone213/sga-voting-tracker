import React, { useState } from "react";
import { db } from "../../../components/firebaseconfig/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import "./SpeakerSettingsPopup.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SpeakerSettingsPopup = ({ closePopup, setBillDetails }) => {
  const [activeTab, setActiveTab] = useState("configureBills");
  const [billName, setBillName] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [discussion, setDiscussion] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async () => {
    if (!billName.trim()) {
      alert("Please enter a bill name before submitting.");
      return;
    }

    if (discussion && (!timeValue.trim() || isNaN(timeValue) || Number(timeValue) < 0)) {
      alert("Please enter a valid time value (positive number). ");
      return;
    }

    setLoading(true);

    try {
      await setDoc(doc(db, "speakerinfo", "bill"), { name: billName });
      if (discussion) {
        await setDoc(doc(db, "speakerinfo", "time"), { minutes: Number(timeValue) });
      }

      if (setBillDetails && typeof setBillDetails === "function") {
        setBillDetails({ name: billName, time: discussion ? Number(timeValue) : null });
      }
    } catch (error) {
      console.error("Error saving speaker info:", error);
      alert("Failed to save speaker info. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <div>
            <div className="input-group">
              <input
                type="text"
                id="bill-name"
                value={billName}
                onChange={(e) => setBillName(e.target.value)}
                className="bill-input"
                placeholder="Bill Name"
              />
            </div>
            
            <div className="input-group">
              <input
                className="discussion-checkbox"
                type="checkbox"
                checked={discussion}
                onChange={() => setDiscussion(!discussion)}
              />
              <label>Discussion?</label>
            </div>
            
            {discussion && (
              <div className="input-group">
                <label htmlFor="time-input">Time (minutes):</label>
                <input
                  type="number"
                  id="time-input"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                  className="time-input"
                  placeholder="Enter Time"
                  min="0"
                />
              </div>
            )}
            
            <button className="submit-button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
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
