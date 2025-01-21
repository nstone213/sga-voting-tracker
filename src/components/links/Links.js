import React from "react";
import "./Links.css";

const Links = ({ isDarkMode }) => {
    return (
        <div className={`links-container ${isDarkMode ? "dark-links" : ""}`}>
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