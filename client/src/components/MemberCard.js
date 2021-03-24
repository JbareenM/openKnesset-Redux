import { useRadioGroup } from "@material-ui/core";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { useEffect, useState } from "react";
import "./MemberCard.css";

function MemberCard(props) {
    const { handleActive, refresh, setRefresh } = props;
    const [suggestions, setSuggestion] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen)

    const [refreshInside, setRefreshInside] = useState(0);

    useEffect(() => {
        fetch('/admin/getSuggestionsByUserSuggest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: props.user.email })
        }).then(r => r.json())
            .then(data => {
                if (data.ok) {
                    setSuggestion(data.suggestions);
                }
            })
    }, [refreshInside]);

    function getSuggestions() {
        fetch('/admin/getSuggestionsByUserSuggest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: props.user.email })
        }).then(r => r.json())
            .then(data => {
                if (data.ok) {
                    setSuggestion(data.suggestions);
                }
            })
    }

    function changeSpam(e) {
        const _id = e._id;
        const isSpam = (e.isSpam);
        fetch('/admin/changeSpam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: _id, isSpam: !isSpam })
        }).then(r => r.json())
            .then(data => {
                console.log("data: ", data);
                setRefreshInside(refreshInside+1);
            });
    }


    return (
        <div className="members-container">
            <div style={{ marginTop: 20 }} className="user-login-div member">
                <h1 className="title-bold-big">{props.user.firstName} {props.user.lastName}</h1>
                <div className="user-login-flex">
                    <label className="title-bold">דוא״ל: </label>
                    <label>{props.user.email}</label>
                </div>
                <div className="user-login-flex">
                    <label className="title-bold">פעיל: </label>
                    <label style={{ color: props.user.active ? "green" : "red", fontWeight: 900, marginLeft: 10 }}>{props.user.active ? "פעיל" : "חסום"}</label>
                    <button id="member-button" style={{ backgroundColor: props.user.active ? "red" : "green" }} onClick={(e) => { handleActive(props) }}>{props.user.active ? " חסימת משתמש" : "ביטול חסימה"}</button>
                </div>
                <div className="user-login-flex">
                    <label className="title-bold">טלפון: </label>
                    <label>{props.user.phone}</label>
                </div>
                <div className="user-login-flex">
                    <label className="title-bold">סוג: </label>
                    <label>{props.user.type === "citizen" ? "אזרח" : (props.user.type === "admin" ? "מנהל" : "חבר כנסת")}</label>
                </div>
                <button className="user-button" onClick={getSuggestions}>קבל ההצעות</button>
                <h1 style={{ margin: "auto", marginTop: 10 }} className="title-bold-big">הצעות</h1>
                {isOpen === false ?
                    <ArrowLeftIcon onClick={(e) => { toggle();/* getSuggestions() */ }}></ArrowLeftIcon> :
                    <><ArrowDropDownIcon onClick={toggle}></ArrowDropDownIcon>
                        {suggestions.length > 0 ? suggestions.map((elem, index) => {
                            return (
                                <div key={index} className="suggestion-member">
                                    <div className="user-login-flex">
                                        <label className="title-bold">תוכן: </label>
                                        <label>{elem.description}</label>
                                    </div>
                                    <div className="user-login-flex">
                                        <label className="title-bold">פעיל: </label>
                                        <label style={{ color: elem.isSpam ? "red" : "green", fontWeight: 900, marginLeft: 10 }}>{elem.isSpam ? "ספאם" : "לא ספאם"}</label>
                                        <button id="member-button" style={{ backgroundColor: elem.isSpam ? "green" : "red" }} onClick={(e) => { changeSpam(elem)}}>{elem.isSpam ? "לא ספאם" : "ספאם"}</button>
                                    </div>
                                    {elem.files.map((file, fileIndex) => {
                                        return (
                                            <div className="user-login-flex">
                                                <AttachmentIcon style={{ width: 20, height: 20 }} />
                                                <a key={fileIndex} href={file.url} target="_blank" style={{ fontSize: 15 }}>{file.name} </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }) : <div style={{ textAlign: "center", marginTop: 10, color: "red" }}>אין הצעות עבור המשתמש הזה!</div>}
                    </>}
            </div>

        </div>
    );
}

export default MemberCard;

