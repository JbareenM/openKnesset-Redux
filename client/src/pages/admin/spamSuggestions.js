import React, { useState, useEffect } from 'react';
import './spamSuggestions.css'
import { useTranslation } from 'react-i18next';
import SuggestionCard from '../../components/SuggestionCard';
import User from './user';


function SpamSuggestions(props) {
    const { t, i18n } = useTranslation();
    const [spam, setSpam] = useState([]);
    const [spamType, setSpamType] = useState(-1);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        if (spamType === 0) {
            fetch('/admin/allSuggestions').then(r => r.json())
                .then(data => {
                    console.log("data: ", data);
                    if (data.ok) {
                        setSpam(data.isSpam);
                    }
                });
        }
        else if (spamType === 1) {
            fetch('/admin/checkSpam')
                .then(r => r.json())
                .then(data => {
                    console.log("data: ", data);
                    if (data.ok) {
                        setSpam(data.isSpam);
                    }
                });
        }
        else if (spamType === 2) {
            fetch('/admin/notSpam')
                .then(r => r.json())
                .then(data => {
                    console.log("data: ", data);
                    if (data.ok) {
                        setSpam(data.isSpam);
                    }
                });
        }
    }, [refresh]);

    function showSpam(e) {

        fetch('/admin/checkSpam')
            .then(r => r.json())
            .then(data => {
                console.log("data: ", data);
                if (data.ok) {
                    setSpam(data.isSpam);
                }
            });
    }

    function allSuggestions() {

        fetch('/admin/allSuggestions').then(r => r.json())
            .then(data => {
                console.log("data: ", data);
                if (data.ok) {
                    setSpam(data.isSpam);
                }
            });
    }

    function notSpam() {
        fetch('/admin/notSpam')
            .then(r => r.json())
            .then(data => {
                console.log("data: ", data);
                if (data.ok) {
                    setSpam(data.isSpam);
                }
            });
    }

    function changeSpam(e) {
        const _id = e.suggestions._id;
        const isSpam = (e.suggestions.isSpam);
        fetch('/admin/changeSpam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: _id, isSpam: !isSpam })
        }).then(r => r.json())
            .then(data => {
                console.log("data: ", data);
                setRefresh(refresh + 1);
            });
    }

    async function changeStatus(e) {
        const email = e.suggestions.submittedBy.email;
        const active = (e.suggestions.submittedBy.active);

        // await fetch('/admin/getMemberByEmail', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email: email })
        // }).then(r => r.json())
        //     .then(data => {
        //         if (data.ok) {
        //             email = data.users[0].email;
        //             active = data.users[0].active;
        //         }
        //     })

        fetch('/admin/changeStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _email: email, active: !active })
        }).then(r => r.json())
            .then(data => {
                console.log("data: ", data);
            });
    }

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    return (

        <div>
            <div className="user-container">

                <button onClick={(e) => { allSuggestions(); setSpamType(0); }}>כל ההצעות</button>
                <button onClick={(e) => { showSpam(); setSpamType(1); }}>הצעות ספאם</button>
                <button onClick={(e) => { notSpam(); setSpamType(2); }}>הצעות פעילות</button>

            </div>
            <div className="suggestions-admin-container">
                <table class="fixed_header-admin">
                    <caption id="title" className="title-bold">
                        הצעות
                </caption>
                    <thead>
                        <tr id="header-admin">
                            <th className="title-bold">תאריך</th>
                            <th className="title-bold">סוג</th>
                            <th className="title-bold">ח״כ</th>
                            <th className="title-bold">אזרח</th>
                            <th className="title-bold">ספאם/לא</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spam.map((elem, index) => {
                            return (
                                <SuggestionCard
                                    key={index}
                                    suggestions={elem}
                                    changeSpam={changeSpam}
                                    changeStatus={changeStatus}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <button onClick={() => changeLanguage('hb')}>Hb</button>
            <button onClick={() => changeLanguage('ar')}>ar</button>
        </div>

    )
}

export default SpamSuggestions

/* <div className="suggestion-container">
    {spam.map((elem, index) => {
        return (
            <SuggestionCard
                key={index}
                suggestions={elem}
                changeSpam={changeSpam}
                changeStatus={changeStatus}
            />
        );
    })}
</div> */