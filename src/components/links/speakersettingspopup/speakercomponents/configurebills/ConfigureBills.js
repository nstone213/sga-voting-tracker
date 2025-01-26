import React, { useState } from "react";
import { db } from "../../firebaseconfig/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import "./ConfigureBills.css";


const ConfigureBills = ({ setBillDetails }) => {
  const [activeTab, setActiveTab] = useState("configureBills");
  const [billName, setBillName] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [discussion, setDiscussion] = useState(false);

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

  );
};

export default ConfigureBills;
