import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './forgetpassword.css'


function Forgetpassword() {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    function handleForgot(e) {
        e.preventDefault();
        console.log("sent data: ", { email: email });        
        // fetch('/user/ForgetPassword', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email })
        // }).then(r => r.json())
        //     .then(data => {
        //         console.log(data);
        //         if (data.ok === true) {
        //             history.push('/resetPassword')
        //             setSuccess("הודעה נשלחה לדוא״ל!");
        //         }
        //         else{
        //             setSuccess("הדוא״ל לא קיים!");
        //         }

        //     })

        fetch('/user/forgetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ from: "openknessetdev@gmail.com", to: email, subject: "hello", text: "localhost:3000/resetPassword" })
        }).then(r => r.json())
            .then(data => {
                console.log(data);
            })

    }

    return (
        <div className="user-container">
            <form onSubmit={handleForgot} id="forget-password" className="user-login-div">
                <h1 className="title-bold-big">שכחתי סיסמה</h1>
                <div className="user-login-flex">
                    <label className="title-bold">דוא"ל:</label>
                    <input type="email" className="input-field" onChange={(e) => {
                        setEmail(e.target.value);
                    }} required></input>
                </div>
                <button className="user-button" type="submit">שחזור</button>
                <label className="message">{success}</label>
            </form>
        </div>
    )
}

export default Forgetpassword