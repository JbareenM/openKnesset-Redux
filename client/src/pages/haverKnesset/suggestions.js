import React, { useState } from 'react';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Collapse } from 'reactstrap';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Attachmentfile from '../../components/attachmentfile';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import './suggestions.css';

function Suggestions(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen)
    const { add, remove, spam } = props;

    return (<>
        <tr>
            <td className="title-large">{props.date.split("T")[0]}
                {isOpen === false ?
                    <ArrowLeftIcon onClick={toggle}></ArrowLeftIcon> : <ArrowDropDownIcon onClick={toggle}></ArrowDropDownIcon>}
            </td>
            <td className="title-large">{props.per}</td>
            <td className="title-large">{props.sub}</td>
            <td className="title-large">{props.offer}</td>
            <td className="title-large" id="accept-decline">
                <CheckBoxIcon id="v-box" style={{ color: 'green' }} onClick={(e) => { add(props) }}>v</CheckBoxIcon>
                <Popup trigger={<CloseIcon style={{ color: 'red' }}>x</CloseIcon>} position="buttom center">
                    <div>
                        <a>are you sure to reject it?</a>
                        <button onClick={(e) => { remove(props) }}>yes</button>
                    </div>
                </Popup>
                <Popup trigger={<WarningIcon style={{ color: 'orange' }}>x</WarningIcon>} position="buttom center">
                    <div>
                        <a>are you sure to send it to spam?</a>
                        <button onClick={(e) => { spam(props) }}>yes</button>
                    </div>
                </Popup>
            </td>
        </tr>
        {isOpen === true ?
            <tr className="test">
                <td><KeyboardReturnIcon /></td>
                <td>
                    {props.files.map((elem, index) => {
                        return (
                            < >
                                <AttachmentIcon style={{width: 20, height:20}}/>
                                <a key={index} href={elem.url} target="_blank" style={{fontSize: 15}}>{elem.name} </a>
                                <br/>
                            </>

                        );
                    })}
                </td>
                <td colSpan="2" className="paragraph-regular">
                    <a>תוכן השיאלתה:</a>
                    <p>{props.description}</p>
                </td>
                <td>
                    <a>סטטוס מפורט:</a>
                    <p>{props.status.status}</p>
                </td>
            </tr> : null}

    </>
    );
}
export default Suggestions


