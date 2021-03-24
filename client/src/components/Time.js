import React from "react";
import Subject from "./Subject";
import "./Time.css";
import Logo from "./Images/calc.PNG";
function Time({ text, data }) {
  // console.log("Data Received to Time: ", data);
  return (
    <div className="time scroll">
      <Subject text={text} Icon={Logo} />
      {data.map((elm) => (
        <div className="time__info">
          <h5 className="h5 h5-new">{elm.date}</h5>
          <h5>{elm.description}</h5>
          <h5></h5>
        </div>
      ))}
    </div>
    // <div className="time scroll">
    //   <Subject text={text} Icon={Logo} />
    //   {data.map((elm) => (
    //     <div className="time__info">
    //       <h5 className="h5 h5-new">{elm.date}</h5>
    //       <h5>{elm.first}:</h5>
    //       <h5>{elm.second}</h5>

    //     </div>
    //   ))}
    // </div>
  );
}

export default Time;
