import React from "react";
import "./KennosForm.css";
import Subject from "./Subject";
import at from "./Images/at.PNG";
import { Multiselect } from "multiselect-react-dropdown";
import { useState, useEffect } from "react";

function KennosForm() {
  const [allKnessetMembersList, setAllKnessetMembersList] = useState([]);
  const [selectedKnessetMembersList, setSelectedKnessetMembersList] = useState(
    []
  );
  const multiselectRef = React.createRef();

  useEffect(() => {
    fetch("/user/getAllKnessetMembers")
      .then((r) => r.json())
      .then((data) => {
        const membersTempList = [];
        data.map((member, index) => {
          return membersTempList.push({
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
    const preferredMembers = selectedKnessetMembersList;
    const input = {
      subject: subjectText,
      description: description,
      preferredKnessetMembers: preferredMembers, // [{name: "full name", email: "email@email.com"}]
      toolType: "כינוס הכנסת",
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
          alert("הבקשה נשלחה בהצלחה. תודה על פנייתך");
        }
      });
    setSelectedKnessetMembersList([]);
    e.target.reset();
    multiselectRef.current.resetSelectedValues();
  }
  return (
    <div className="recomnde">
      <Subject Icon={at} text="הגש הצעה" />
      <form id="myform" onSubmit={handleForm}>
        <div className="recomend__info">
          <div className="reomnde__SecindHalf">
            <h4>נושא הצעה לסדר:</h4>
            <input type="text" name="subject" required />
            <h4>דברי הסבר:</h4>
            <textarea
              name="description"
              id=""
              cols="47"
              rows="12"
              required
            ></textarea>
          </div>
          <div className="reomnde__FirstHalf">
            <h4>חכ"ים רלוונטיים: </h4>
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
              placeholder="בחר חבר כנסת"
            />
            <br />
            <button className="submit-form-btn" type="submit">
              שלח
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default KennosForm;
