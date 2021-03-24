import "./SuggestionCard.css";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import AttachmentIcon from '@material-ui/icons/Attachment';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from "react";

function SuggestionCard(props) {
    const { changeSpam, changeStatus } = props;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen)

    return (
        <div>
            <>
                <tr>
                    <td className="title-large">{props.suggestions.date?.split("T")[0]}
                        {isOpen === false ?
                            <ArrowLeftIcon onClick={toggle}></ArrowLeftIcon> : <ArrowDropDownIcon onClick={toggle}></ArrowDropDownIcon>}
                    </td>
                    <td className="title-large">{props.suggestions.toolType?.title}</td>
                    <td className="title-large">{props.suggestions.whoIsWorkingOnIt?.firstName} {props.suggestions.whoIsWorkingOnIt?.lastName}</td>
                    <td className="title-large">{props.suggestions.submittedBy?.firstName} {props.suggestions.submittedBy?.lastName}</td>
                    <td className="title-large" id="accept-decline">
                        {props.suggestions.isSpam ?
                            <Popup trigger={<CheckBoxIcon id="v-box" style={{ color: 'green' }}>v</CheckBoxIcon>} position="buttom center">
                                <div>
                                    <a>are you sure to remove it from spam?</a>
                                    <button onClick={(e) => { changeSpam(props) }}>yes</button>
                                </div>
                            </Popup> :
                            <Popup trigger={<CloseIcon style={{ color: 'red' }}>x</CloseIcon>} position="buttom center">
                                <div>
                                    <a>are you sure to send it to spam?</a>
                                    <button onClick={(e) => { changeSpam(props) }}>yes</button>
                                </div>
                            </Popup>}
                    </td>
                </tr>
                {isOpen === true ?
                    <tr className="test">
                        <td><KeyboardReturnIcon /></td>
                        <td>
                            {props.suggestions.files.map((elem, index) => {
                                return (
                                    < >
                                        <AttachmentIcon style={{ width: 20, height: 20 }} />
                                        <a key={index} href={elem.url} target="_blank" style={{ fontSize: 15 }}>{elem.name} </a>
                                        <br />
                                    </>

                                );
                            })}
                        </td>
                        <td colSpan="2" className="paragraph-regular">
                            <a>תוכן השיאלתה:</a>
                            <p>{props.suggestions.description}</p>
                        </td>
                        <td>
                            <a>חסימת משתמש</a>
                            {console.log("active: ", "" + props.suggestions.submittedBy.active)}
                            {props.suggestions.submittedBy.active ?
                                <Popup trigger={<button>חסימה</button>} position="buttom center">
                                    <div>
                                        <a>are you sure to block user?</a>
                                        <button onClick={(e) => { changeStatus(props) }}>yes</button>
                                    </div>
                                </Popup> :
                                <Popup trigger={<button>ביטול חסימה</button>} position="buttom center">
                                    <div>
                                        <a>are you sure to unblock user?</a>
                                        <button onClick={(e) => { changeStatus(props) }}>yes</button>
                                    </div>
                                </Popup>}

                        </td>
                    </tr> : null}

            </>


        </div>
    );
}

export default SuggestionCard;
