import React, { useState } from "react";
import { db } from "../../firebaseconfig/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import "./ConfigureBills.css";


const ConfigureBills = ({ setBillDetails }) => {
  const [activeTab, setActiveTab] = useState("configureBills");
  const [billName, setBillName] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [discussion, setDiscussion] = useState(false);

  return (

  );
};

export default ConfigureBills;
