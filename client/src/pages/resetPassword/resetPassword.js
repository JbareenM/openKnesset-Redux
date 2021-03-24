import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

//import './normalquery.css'


const ResetPassword = () => {
    const [serverToken, setToken] = useState("");
    const history = useHistory();

    useEffect(() => {
        if ((window.location.search.substring(1).length) !== 0) {
            setToken("?" + window.location.search.substring(1));
        }
    }, []);


    const [newpassword, setNewPassword] = useState("")
    const [repeatnewpassword, setRepeatNewPassword] = useState("")
    const [success, setSuccess] = useState("");
    function handlereset(e) {
        e.preventDefault();
        console.log(newpassword, repeatnewpassword);
        if (newpassword === repeatnewpassword) {
            fetch(`/user/savePassword${serverToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: newpassword })
            }).then(r => r.json())
                .then(data => {
                    console.log("data: ", data);
                    if(data.ok){
                        setSuccess(" הסיסמה שונתה בהצלחה");
                        // history.push("loginRegisteration");
                    }
                    else{
                        setSuccess("אי אפשר לשנות הסיסמה!");
                    }
                })

        } else {
            setSuccess("לא אותו דבר!")
        }
    }

    return (
        <div className="user-container">
            <form onSubmit={handlereset} className="user-login-div">
                <h1 className="title-bold-big">שינוי סיסמה</h1>
                <div className="user-login-flex">
                    <label className="title-bold">סיסמה חדשה</label>
                    <input type="password" className="input-field" onChange={(e) => {
                        setNewPassword(e.target.value);
                    }} required></input>
                </div>
                <div className="user-login-flex">
                    <label className="title-bold">סיסמה חדשה</label>
                    <input type="password" className="input-field" onChange={(e) => {
                        setRepeatNewPassword(e.target.value);
                    }} required></input>
                </div>
                <button className="user-button" type="submit">שחזור</button>
                <label className="message">{success}</label>
            </form>
        </div>
    )
}

export default ResetPassword