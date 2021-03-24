import React, { useState, useEffect } from 'react';
import './addKnesset.css'
import { useTranslation } from 'react-i18next';
function AddKnesset(props) {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [telephon, setTelephon] = useState("");
    const [error, setError] = useState("");
    const [registermessage, setRegisterMessage] = useState("");
    function handleRegister(e) {
        e.preventDefault();
        console.log({ firstName: firstName, lastName: lastName, email: email, telephon: telephon })

        // firstName doesn't contrains numbers 

        const validPhone = new RegExp("(00972|0|\\+972)[5][0-9]{8}");
        if (telephon === "" || validPhone.test(telephon)) {

            fetch('/admin/addMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, phone: telephon })
            }).then(r => r.json())
                .then(data => {
                    console.log(data);
                    //if login true - redirect to forms creation page;
                    if (data.ok === true) {
                        setRegisterMessage("צעד אחד נותר, תבדוק הדוא״ל.");
                    }
                    else {
                        setRegisterMessage("הדוא״ל כבר קיים !")
                    }

                })
        }
        else {
            setRegisterMessage("מספר טלפון לא חוקי!")
        }
    }
    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <div className="user-container">
                <form onSubmit={handleRegister} className="user-login-div">
                    <h1 className="title-bold-big">{t('signup')}</h1>
                    <div className="user-login-flex">
                        <label className="title-bold">*{t('firstName')}</label>
                        <input type="text" className="input-field" onChange={(e) => {
                            setFirstName(e.target.value);
                        }} required></input>
                    </div>
                    <div className="user-login-flex">
                        <label className="title-bold">*{t('lastName')}</label>
                        <input type="text" className="input-field" onChange={(e) => {
                            setLastName(e.target.value);
                        }} required></input>
                    </div>
                    <div className="user-login-flex">
                        <label className="title-bold">*{t('email')}</label>
                        <input type="email" className="input-field" onChange={(e) => {
                            setEmail(e.target.value);
                        }} required></input>
                    </div>
                    <div className="user-login-flex">
                        <label className="title-bold">{t('phone')}</label>
                        <input type="text" className="input-field" onChange={(e) => {
                            setTelephon(e.target.value);
                        }}></input>
                    </div>
                    <label id="required" className="paragraph-regular">*{t('star')}</label>
                    <button className="user-button" type="submit">{t('buttonSignup')}</button>
                    <label className="message">{registermessage}</label>
                </form>
            </div>
            <a id="forgot-pass" onClick={() => changeLanguage('hb')}>Hb</a>
            <lable>|</lable>
            <a id="forgot-pass" onClick={() => changeLanguage('ar')}>ar</a>
        </div>


    )
}

export default AddKnesset