import React, { useState, useEffect } from "react";
import "./haverKnesset.css";
import Suggestion from "./suggestions";
import ActiveSuggestions from "../../components/activeSuggestion";
import { useTranslation } from "react-i18next";

function HaverKnesset() {

  //TODO: redux
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchCompanies())
  // }, []);
  // let companies = useSelector(state => !!state.CompaniesListReducer && state.CompaniesListReducer.companies);

  const { t, i18n } = useTranslation();
  const [myNewSuggestions, setMyNewSuggestions] = useState([]);
  const [activeSuggestions, setActiveSuggestions] = useState([]);
  const [allNewSuggestions, setAllNewSuggestions] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch("/suggestion/byKnessetMemberValidate")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
         
          let arr = [];
          data.newSuggestions.map((elem, index) => {
            arr = [
              ...arr,
              {
                key: index,
                date: elem.date,
                per: elem.toolType.title,
                sub: elem.subject,
                offer:
                  "" +
                  elem.submittedBy.firstName +
                  " " +
                  elem.submittedBy.lastName,
                description: elem.description,
                status: elem.status,
                _id: elem._id,
                files: elem.files,
              },
            ];
          });
          setMyNewSuggestions(arr);
          arr = [];
          data.adoptedSuggestions.map((elem, index) => {
            let opt = [];
            if (elem.toolType.title === "כינוס הכנסת") {
              opt = ["תאריך התכנסות צפוי", "איסוף חתימות", "התכנסה"];
            } else if (elem.toolType.title === "נאום בן דקה") {
              opt = ["הוקרא", "תאריך הקראה צפוי"];
            } else if (elem.toolType.title === "שאילתא") {
              opt = ["תאריך קבלת תשובה", "תאריך העברה למשרד"];
            } else {
              opt = ["תאריך התכנסות צפוי", "איסוף חתימות", "התכנסה"];
            }
            arr = [
              ...arr,
              {
                key: index,
                date: elem.date,
                per: elem.toolType.title,
                sub: elem.subject,
                offer:
                  "" +
                  elem.submittedBy.firstName +
                  " " +
                  elem.submittedBy.lastName,
                description: elem.description,
                status: elem.status,
                _id: elem._id,
                files: elem.files,
                options: opt,
              },
            ];
          });
          setActiveSuggestions(arr);
          arr = [];
          data.newGeneralSuggestions.map((elem, index) => {
            arr = [
              ...arr,
              {
                key: index,
                date: elem.date,
                per: elem.toolType.title,
                sub: elem.subject,
                offer:
                  "" +
                  elem.submittedBy.firstName +
                  " " +
                  elem.submittedBy.lastName,
                description: elem.description,
                status: elem.status,
                _id: elem._id,
                files: elem.files,
              },
            ];
          });
          setAllNewSuggestions(arr);
        }
      });
  }, [refresh]);

  function handleVmySug(e) {
    console.log("e: ", e);
    console.log("my Suggestions selected!");
    fetch("/suggestion/reject-adopt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adopt: true, suggestion: e._id }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setRefresh(refresh + 1);
      });
  }

  function handleXmySug(e) {
    console.log("e: ", e);
    console.log("my Suggestions removed!");
    fetch("/suggestion/reject-adopt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adopt: false, suggestion: e._id }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setRefresh(refresh + 1);
      });
  }

  function handleVallSug(e) {
    console.log("e: ", e);
    console.log("all Suggestions selected!");
    fetch("/suggestion/reject-adopt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adopt: true, suggestion: e._id }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setRefresh(refresh + 1);
      });
  }

  function handleXallSug(e) {
    console.log("e: ", e);
    console.log("all Suggestions removed!");
    fetch("/suggestion/reject-adopt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adopt: false, suggestion: e._id }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setRefresh(refresh + 1);
      });
  }

  function handleSpam(e) {
    console.log("e: ", e._id);
    const _id = e._id;
    fetch("/suggestion/spamSuggestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id, isSpam: true }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setRefresh(refresh + 1);
      });
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className="suggestions-container">
        <table class="fixed_header">
          <caption id="title" className="title-bold">
            {t("ownSuggestions")}
          </caption>
          <thead>
            <tr id="header">
              <th className="title-bold">{t("date")}</th>
              <th className="title-bold">{t("parlamintary")}</th>
              <th className="title-bold">{t("subject")}</th>
              <th className="title-bold">{t("offer")}</th>
              <th className="title-bold">{t("adoptionrejection")}</th>
            </tr>
          </thead>
          <tbody>
            {myNewSuggestions.map((elem, index) => {
              return (
                <Suggestion
                  key={index}
                  date={elem.date}
                  per={elem.per}
                  sub={elem.sub}
                  offer={elem.offer}
                  add={handleVmySug}
                  remove={handleXmySug}
                  spam={handleSpam}
                  description={elem.description}
                  status={elem.status}
                  _id={elem._id}
                  files={elem.files}
                />
              );
            })}
          </tbody>
        </table>

        <table class="fixed_header">
          <caption id="title" className="title-bold">
            {t("updateSuggestions")}
          </caption>
          <thead>
            <tr id="header">
              <th className="title-bold">{t("date")}</th>
              <th className="title-bold">{t("parlamintary")}</th>
              <th className="title-bold">{t("subject")}</th>
              <th className="title-bold">{t("offer")}</th>
              <th className="title-bold">{t("status")}</th>
            </tr>
          </thead>
          <tbody>
            {activeSuggestions.map((elem, index) => {
              return (
                <ActiveSuggestions
                  key={index}
                  date={elem.date}
                  per={elem.per}
                  sub={elem.sub}
                  offer={elem.offer}
                  description={elem.description}
                  options={elem.options}
                  status={elem.status}
                  _id={elem._id}
                  files={elem.files}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              );
            })}
          </tbody>
        </table>

        <table class="fixed_header">
          <caption id="title" className="title-bold">
            {t("allSuggestions")}
          </caption>
          <thead>
            <tr id="header">
              <th className="title-bold">{t("date")}</th>
              <th className="title-bold">{t("parlamintary")}</th>
              <th className="title-bold">{t("subject")}</th>
              <th className="title-bold">{t("offer")}</th>
              <th className="title-bold">{t("adoptionrejection")}</th>
            </tr>
          </thead>
          <tbody>
            {allNewSuggestions.map((elem, index) => {
              return (
                <Suggestion
                  key={index}
                  date={elem.date}
                  per={elem.per}
                  sub={elem.sub}
                  offer={elem.offer}
                  add={handleVallSug}
                  remove={handleXallSug}
                  spam={handleSpam}
                  description={elem.description}
                  status={elem.status}
                  _id={elem._id}
                  files={elem.files}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {/* TAL: it shouldnt be an "a" but a "div" */}
      <a id="forgot-pass" onClick={() => changeLanguage("hb")}>
        Hb
      </a>
      <lable>|</lable>
      <a id="forgot-pass" onClick={() => changeLanguage("ar")}>
        ar
      </a>
    </>
  );
}

export default HaverKnesset;
