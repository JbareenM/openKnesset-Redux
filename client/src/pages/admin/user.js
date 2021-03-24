import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './user.css';

function User(props) {
    const { spam } = props;
    const active = props.active

    return (<>
        <tr>
            <td className="title-large">{props.fname} {props.lname}
            </td>
            <td className="title-large">{props.email}</td>
            <td className="title-large">{props.phone}</td>
            <td className="title-large">{props.company}</td>
            <td className="title-large" >
                {props.type}
            </td>

            {active ?
                <td className="title-large" id="accept-decline">
                    <Popup trigger={<PersonAddIcon style={{ color: 'green' }}>x</PersonAddIcon>} position="buttom center">
                        <div>
                            <a>are you sure to send it to spam?</a>
                            <button onClick={(e) => { spam(props) }}>yes</button>
                        </div>
                    </Popup>
                </td> : <td className="title-large" id="accept-decline">
                    <Popup trigger={<PersonAddDisabledIcon style={{ color: 'red' }}>x</PersonAddDisabledIcon>} position="buttom center">
                        <div>
                            <a>are you sure to send it to spam?</a>
                            <button onClick={(e) => { spam(props) }}>yes</button>
                        </div>
                    </Popup></td>}

        </tr>


    </>
    );
}
export default User