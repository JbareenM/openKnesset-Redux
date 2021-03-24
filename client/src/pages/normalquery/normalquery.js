import React from "react";
import "./normalquery.css";
import RegularQueryForm from "../../components/RegularQueryForm";
import TopCards from "../../components/TopCards";
import LoginDiv from "../../components/LoginDiv";
import { useState, useEffect } from "react";

//import './normalquery.css'

const Normalquery = () => {
  const [ConnectionFlag, setConnectionFlag] = useState(false);
  useEffect(() => {
    checkConnection();
  }, []);
  function checkConnection() {
    fetch('/user/checkConnection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    }).then(r => r.json())
      .then(data => {
        if (data.ok && data.type === "citizen") {
          setConnectionFlag(true);
        }
        else {
          setConnectionFlag(false);
        }
      })
  }
  return (
    <div>
      <div className="container">
        <TopCards toolType={"שאילתא"} />
        {ConnectionFlag ? <RegularQueryForm /> : <LoginDiv />}
      </div>
    </div>
  );
};

export default Normalquery;
