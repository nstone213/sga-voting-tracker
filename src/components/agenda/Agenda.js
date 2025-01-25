import React, { useState, useEffect } from "react";
import "./Agenda.css";

const Agenda = () => {

  return (
    <div className="agenda-container">
        <p className="agenda-title">Undergraduate House of Representatives Agenda</p>
        <p>
          DATE
        </p>
        <div className="agenda-items">
          <p>
            1. Call to Order
          </p>
          <p>
            2. SGA Mission Statement
          </p>
          <p>
            3. Buzz of the Week!
          </p>
          <p>
            4. Cabinet Updates
          </p>
          <p>
            5. Presentations
          </p>
          <p>
            6. Open Forum
          </p>
          <p>
            7. Old Business
          </p>
          <p>
            8. New Business
          </p>
          <p>
            9. Special Topics
          </p>
          <p>
            10. Announcements
          </p>
          <p>
            11. Presidential Review
          </p>
          <p>
            12. Adjournment
          </p>
        </div>
    </div>
  );  
};

export default Agenda;