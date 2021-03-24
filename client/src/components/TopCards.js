import React, { useState, useEffect } from "react";
import "./TopCards.css";
import CurrentCard from "./CurrentCard";
import Taknon from "./Taknon";
import Time from "./Time";

function TopCards(props) {
  const [toolData, setData] = useState([]);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toolType: props.toolType }),
  };

  useEffect(() => {
    fetch("/parliamentaryTools/getToolByType", requestOptions)
      .then((r) => r.json())
      .then((data) => {
        setData(data);
        // console.log("toolData: ", toolData);
        console.log("Parlmintary tool: ", data);
        setHistory([...data.history]);
        setFuture([...data.future]);
      });
  }, []);

  if (toolData === undefined) {
    return <>טוען נתונים...</>;
  }

  return (
    <div>
      <div className="up">
        <CurrentCard tool={toolData.parliamentaryTool} />
        {toolData.parliamentaryTool && (
          <Taknon tool={toolData.parliamentaryTool} />
        )}
      </div>
      <div className="down">
        <Time data={future} text="עתיד" />
        <Time data={history} text="היסטוריה" />
      </div>
    </div>
  );
}
let timeHistoryData = [
  { date: "17.8.19", first: "ישיבת המליאה", second: "נאומים בני דקה" },
  { date: "12.8.19", first: "ישיבת המליאה", second: "נאומים בני דקה" },
  { date: "08.8.19", first: "ישיבת המליאה", second: "נאומים בני דקה" },
];
let timeFutreData = [
  { date: "22.8.19", first: "ישיבת המליאה", second: "נאומים בני דקה" },
];
export default TopCards;
