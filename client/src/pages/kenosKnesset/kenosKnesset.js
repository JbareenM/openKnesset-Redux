import React from "react";
import "./kenosKnesset.css";
import KennosForm from "../../components/KennosForm";
import TopCards from "../../components/TopCards";
import LoginDiv from "../../components/LoginDiv";
import  { useState, useEffect } from "react";

function KenosKnesset() {
  const [ConnectionFlag,setConnectionFlag]=useState(false);
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
        if(data.ok===true){setConnectionFlag(true)}
          else {setConnectionFlag(false)}
      })
  }
  return (
    <div>
      <div className="container">
        <TopCards toolType={"כינוס הכנסת"} />
        {ConnectionFlag ?  <KennosForm />:<LoginDiv/>}
       
      </div>
    </div>
  );
}

export default KenosKnesset;
