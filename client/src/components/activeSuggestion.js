import React, { useEffect, useState } from 'react';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import AttachmentIcon from '@material-ui/icons/Attachment';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function ActiveSuggestions(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [status, setStatus] = useState(props.options[0]);
    const { refresh, setRefresh } = props;

    function test_select(e) {
        setStatus(e.target.value);
    }

    function select_date(e) {
        e.preventDefault();
        console.log("status: ", status);
        console.log("date: ", e.target.suggestion_date.value);
        fetch('/suggestion/updateSuggestion', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newStatus: status, suggestion: props, date: e.target.suggestion_date.value })
        }).then(r => r.json())
            .then(data => {
                console.log("data: ", data);
                setRefresh(status + 1);
            })
    }

    return (<>
        <tr>
            <td className="title-large">{props.date.split("T")[0]}
                {isOpen === false ?
                    <ArrowLeftIcon onClick={toggle}></ArrowLeftIcon> : <ArrowDropDownIcon onClick={toggle}></ArrowDropDownIcon>}
            </td>
            <td className="title-large">{props.per}</td>
            <td className="title-large">{props.sub}</td>
            <td className="title-large">{props.offer}</td>
            <td id="test" className="title-large">
                <form onChange={test_select}>
                    <select id="status" className="drop-down-menu" style={{ width: "100%" }}>
                        {props.options.map((op, index) => {
                            return (<option key={index} value={op}>{op}</option>);
                        })}
                    </select>
                </form>
                <form onSubmit={select_date} style={{ marginTop: 5 }}>
                    <input name="suggestion_date" style={{ width: "96%" }} type="date" defaultValue={(new Date()).toISOString().substr(0, 10)} />
                    <button type="submit" style={{ marginTop: 5 }}>עדכן סטטוס</button>
                </form>
                {/* <Popup trigger={<button>בחר תאריך</button>} position="buttom center">
                    <form onSubmit={select_date}>
                        <input name="suggestion_date" type="date" defaultValue={(new Date()).toISOString().substr(0, 10)} />
                        <button type="submit">בחר תאריך</button>
                    </form>
                </Popup> */}
            </td>
        </tr>
        {isOpen === true ?
            <tr className="test">
                <td><KeyboardReturnIcon /></td>
                <td>
                    {props.files.map((elem, index) => {
                        return (
                            <>
                                <AttachmentIcon style={{ width: 20, height: 20 }} />
                                <a key={index} href={elem.url} target="_blank" style={{ fontSize: 15 }}>{elem.name}</a>
                                <br />
                            </>
                        );
                    })}

                </td>
                <td colSpan="2" className="paragraph-regular">
                    <a>תוכן השיאלתה:</a>
                    <p>{props.description}</p>
                </td>
                <td id="status-lines">
                    <label style={{textDecoration: "underline", fontWeight: 900}}>סטטוס מפורט:</label>
                    {props.status.map((elem, index) => {
                        if (index > (props.status.length - 4)){
                            return (
                                <div>
                                    <label style={{fontWeight: 900}}>{elem.status}</label>
                                    <br />
                                    <label>{elem.date.split("T")[0]}</label>
                                </div>
                            )
                        }
                    })}
                </td>
            </tr> : null}

    </>
    );
}
export default ActiveSuggestions