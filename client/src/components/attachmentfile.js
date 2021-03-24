import React, { useState } from "react";
import "./attachmentfile.css";
import AttachmentsIcon from "./Images/attacments-icon.png";
import PeopleIcon from "./Images/people.png";

function Attachmentfile({fileTitle}){
    return(
        <div class="attachment">
            <img src={AttachmentsIcon}></img>
            <p>{fileTitle}</p>
            <img src={PeopleIcon}></img>
      </div>

    )
}


export default Attachmentfile;
