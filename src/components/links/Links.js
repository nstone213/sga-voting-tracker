import React, { useState } from "react";
import "./Links.css";
import ToggleSwitch from "./toggleswitch/ToggleSwitch";

const Links = () => {
    const [isOn, setIsOn] = useState(false);
    
    const handleToggle = () => {
        setIsOn((prev) => !prev);
        document.body.classList.toggle("dark-mode", !isOn); // Add/remove global dark mode
    };

    return (
        <div className={`links-container ${isOn ? "dark-links" : ""}`}>
            <div className="toggleswitch-container" style={{ padding: "20px" }}>
                <ToggleSwitch isOn={isOn} handleToggle={handleToggle} />
            </div>
            <ul>
                <li>
                    <a href="https://github.com/nstone213" target="_blank" rel="noopener noreferrer">
                        Docs
                    </a>
                </li>
                <li>
                    <a href="https://www.sga.gatech.edu/" target="_blank" rel="noopener noreferrer">
                        GT SGA Website
                    </a>
                </li>
                <li>
                    <a href="https://www.notion.com/" target="_blank" rel="noopener noreferrer">
                        UHR Notion
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Links;