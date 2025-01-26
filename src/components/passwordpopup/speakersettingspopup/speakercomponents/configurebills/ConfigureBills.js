import React, { useState } from "react";
import { db } from "../../../../firebaseconfig/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import "./ConfigureBills.css";


const ConfigureBills = ({ setBillDetails }) => {
  const [billName, setBillName] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [discussion, setDiscussion] = useState(false);
  const [loading, setLoading] = useState(false);

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
  );
};

export default ConfigureBills;
