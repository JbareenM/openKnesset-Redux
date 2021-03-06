import React from "react";
import "./RegularQueryForm.css";
import Subject from "./Subject";
import at from "./Images/at.PNG";
import { Multiselect } from "multiselect-react-dropdown";
import { useState, useEffect } from "react";
import Attachmentfile from "./attachmentfile";

import AttachIcon from "./Images/attach-icon.png";
import AttachmentsIcon from "./Images/attacments-icon.png";
import PeopleIcon from "./Images/people.png";
import FirebaseFileUpload from "./firebase/FirebaseFileUpload/FirebaseFileUpload";

function RegularQueryForm() {
  const [selectedKnessetMembersList, setSelectedKnessetMembersList] = useState(
    []
  );
  const [allKnessetMembersList, setAllKnessetMembersList] = useState([]);

  const multiselectRef = React.createRef();

  const [files, setFiles] = useState([]);

  function handlefile(e) {
    e.preventDefault();
    var files = e.target.files;
    console.log(files);
    var filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    setFiles(filesArr);
    console.log("state", files);
  }

  useEffect(() => {
    fetch("/user/getAllKnessetMembers")
      .then((r) => r.json())
      .then((data) => {
        const membersTempList = [];
        data.map((member, index) => {
          membersTempList.push({
            name: member.firstName + " " + member.lastName,
            email: member.email,
          });
        });
        setAllKnessetMembersList([
          ...allKnessetMembersList,
          ...membersTempList,
        ]);
        console.log("allKnessetMembersList: ", allKnessetMembersList);
      });
  }, []);

  function dummy() {
    console.log("hehe");
  }

  async function onSelect(selectedList, selectedItem) {
    await setSelectedKnessetMembersList([
      ...selectedKnessetMembersList,
      selectedItem,
    ]);
    console.log("select invoked, state updated: ", selectedKnessetMembersList);
  }

  async function onRemove(selectedList, removedItem) {
    const tempList = selectedList.filter((item) => {
      return item.email !== removedItem.email;
    });
    setSelectedKnessetMembersList(tempList);
    console.log("New list: ", tempList);
  }

  function handleForm(e) {
    e.preventDefault();
    const subjectText = e.target.subject.value;
    const description = e.target.description.value;
    const question = e.target.query.value;
    const additionalQuestion = e.target.aditionalQuestion.value;
    const preferredMembers = selectedKnessetMembersList;
    const input = {
      subject: subjectText,
      description: description,
      question: question,
      additionalQuestion: additionalQuestion,
      preferredKnessetMembers: preferredMembers, // [{name: "full name", email: "email@email.com"}]
      toolType: "????????????",
      files: files,
    };
    console.log("Input being sent: ", input);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    };
    fetch("suggestion/createSuggestion", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Form sent to server, result: ", data);
        if (data.ok === true) {
          alert("?????????? ?????????? ????????????. ???????? ???? ????????????");
        }
      });
    setSelectedKnessetMembersList([]);
    e.target.reset();
    multiselectRef.current.resetSelectedValues();
  }

  return (
    <div className="recomnde">
      <Subject Icon={at} text="?????? ????????" />
      <form id="myform" onSubmit={handleForm}>
        <div className="recomend__info">
          <div className="reomnde__SecindHalf">
            <h4>???????? ???????? ????????:</h4>
            <input type="text" name="subject" required />
            <h4>???????? ????????:</h4>
            <textarea
              name="description"
              id=""
              cols="47"
              rows="12"
              required
            ></textarea>
            <h4>????????: (???????? ???????????? 50 ??????????)</h4>
            <input type="text" name="query" required />
            <div className="additional-query-div">
              <h4>???????? ????????: </h4>
              <p>(??????????????????, ???????? ???? ?????????? ?????????? ???????????? ??????????)</p>
            </div>
            <input type="text" name="aditionalQuestion" />
          </div>
          <div className="reomnde__FirstHalf">
            <h4>????"???? ??????????????????: </h4>
            <Multiselect
              style={{
                multiselectContainer: {
                  width: "70%",
                  border: "5px solid black",
                  "border-radius": "15px",
                },
                inputField: {
                  margin: "5px",
                },
                optionContainer: {
                  // To change css for option container
                  width: "100%",
                  "text-align": "right",
                },
                searchBox: {
                  // To change search box element look
                  "text-align": "right",
                  color: "#000",
                  border: "0px",
                },
                option: {
                  // To change css for dropdown options

                  "font-size": "12px",
                },
                "option:hover": {
                  // To change css for dropdown options
                  "background-color": "grey",
                  "font-size": "12px",
                },
              }}
              options={allKnessetMembersList} // Options to display in the dropdown
              ref={multiselectRef}
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder="?????? ?????? ????????"
            />
            <br />
            <div class="attach-title-div">
              <img src={AttachIcon}></img>
              <h4>?????????? ?????????????? ???????????? </h4>
            </div>
            <FirebaseFileUpload
              filsesToSend={files}
              filesSetter={setFiles}
            ></FirebaseFileUpload>

            <button className="submit-form-btn" type="submit">
              ??????
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegularQueryForm;
