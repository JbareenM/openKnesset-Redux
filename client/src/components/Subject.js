import React from "react";
import "./Subject.css";

function Subject({ Icon, text }) {
  return (
    <div className="subject">
      <div className="subject-logo">
        <img src={Icon} alt="" />
      </div>
      <div className="subject-text">
        <h4>{text}</h4>
      </div>
    </div>
  );
}

export default Subject;
