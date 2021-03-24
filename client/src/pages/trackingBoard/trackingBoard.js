import React, { useState, useEffect } from "react";
import "./trackingBoard.css";

//import './normalquery.css'

const TrackingBoard = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("/suggestion/byUserSuggest")
      .then((r) => r.json())
      .then((data) => {
        console.log("Suggestions data: ", data);
        if (data.ok === true) {
          setSuggestions(data.suggestions);
        }
        //alert("am in");
      });
  }, []);

  return (
    <div>
      <div className="container">
        {suggestions &&
          suggestions.map((suggestion, index) => {
            return (
              <div className="board-item-container" key={index}>
                <div className="board-item">
                  <p>
                    {suggestion.date.split("T")[0]} {suggestion.toolType.title}
                  </p>
                  <h1>{suggestion.subject}</h1>
                  <p>תאריך הגשה: {suggestion.date.split("T")[0]}</p>
                  <p>
                    אומץ על ידי: {suggestion.whoIsWorkingOnIt?.firstName}{" "}
                    {suggestion.whoIsWorkingOnIt?.lastName}
                  </p>
                  <p>
                    {suggestion.status[suggestion.status.length - 1].status}{" "}
                    {
                      suggestion.status[
                        suggestion.status.length - 1
                      ].date.split("T")[0]
                    }{" "}
                  </p>
                  <h1>תוכן:</h1>
                  <p>{suggestion.description}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TrackingBoard;
