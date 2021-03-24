import { set } from 'mongoose';
import React, { useState, useEffect } from 'react';
import './members.css'
import User from './user'
import MemberCard from '../../components/MemberCard';

function Members(props) {
    const [users, setUsers] = useState([]);
    // const [blcokUsers, setBlockUsers] = useState([]);
    // const [activeUsers, setActiveUsers] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const [byEmail, setByEmail] = useState(-1);

    const [userByEmail, setUserByEmail] = useState([]);
    const [userByName, setUserByName] = useState([]);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [suggestions, setSuggestion] = useState([]);

    useEffect(() => {
        if (byEmail === 0) {
            fetch('/admin/getMemberByEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            }).then(r => r.json())
                .then(data => {
                    if (data.ok) {
                        setUserByEmail(data.users);
                    }
                })
        }
        else if (byEmail === 1) {
            fetch('/admin/getMemberByFirstLastName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName: firstName, lastName: lastName })
            }).then(r => r.json())
                .then(data => {
                    console.log("data from name: ", data);
                    if (data.ok) {
                        setUserByName(data.users);
                    }
                })
        }
        else if(byEmail === 2) {
            fetch('/admin/getAllMembers')
                .then(r => r.json())
                .then(data => {
                    if (data.ok) {
                        setUsers(data.users)
                    }
                })
        }
    }, [refresh]);

    function getAll() {
        fetch('/admin/getAllMembers')
            .then(r => r.json())
            .then(data => {
                if (data.ok) {
                    setUsers(data.users)
                }
            })
    }

    function handleActive(e) {
        const active = (e.user.active);
        fetch('/admin/changeStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _email: e.user.email, active: (!active) })
        }).then(r => r.json())
            .then(data => {
                console.log(data);
                setRefresh(refresh + 1);
            })
    }

    function handleEmail(e) {
        e.preventDefault();
        fetch('/admin/getMemberByEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        }).then(r => r.json())
            .then(data => {
                if (data.ok) {
                    setUserByEmail(data.users);
                }
            })

    }

    function handleFirstLastName(e) {
        e.preventDefault();
        console.log("firstName: ", firstName, " lastName:", lastName);
        fetch('/admin/getMemberByFirstLastName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName: firstName, lastName: lastName })
        }).then(r => r.json())
            .then(data => {
                console.log("data from name: ", data);
                if (data.ok) {
                    setUserByName(data.users);
                }
            })
    }

    return (
        <div className="members-admin-container">
            <div id="search-choose">
                <button id="serach-button" onClick={(e) => { setByEmail(0) }}>חיפוש לפי דוא״ל</button>
                <button id="serach-button" onClick={(e) => { setByEmail(1) }}>חיפוש לפי שם</button>
                <button id="serach-button" onClick={(e) => { getAll(); setByEmail(2); }}>כל המשתמשים</button>
            </div>
            {byEmail === 0 ? <><form id="input-search" onSubmit={handleEmail}>
                <input className="input-field" type="email" placeholder="דוא״ל" name="email" onChange={(e) => { setEmail(e.target.value) }}></input>
                <button id="serach-button" type="submit">חיפוש</button>
            </form >
                {userByEmail.map((elem, index) => {
                    return (
                        <MemberCard key={index}
                            user={elem}
                            handleActive={handleActive}
                            suggestions={suggestions}
                            setSuggestion={setSuggestion}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    );
                })} </> : (byEmail === 1 ?
                    <><form id="input-search" onSubmit={handleFirstLastName}>
                        <input className="input-field" type="text" name="firstName" placeholder="שם פרטי" onChange={(e) => {
                            setFirstName(e.target.value)
                        }}></input>
                        <input className="input-field" type="text" name="lastName" placeholder="שפ משפחה" onChange={(e) => {
                            setLastName(e.target.value)
                        }}></input>
                        <button id="serach-button" type="submit">חיפוש</button>
                    </form>
                        {userByName.map((elem, index) => {
                            return (
                                <MemberCard key={index}
                                    user={elem}
                                    handleActive={handleActive}
                                    suggestions={suggestions}
                                    setSuggestion={setSuggestion}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            );
                        })}</> : <>
                        {users.map((elem, index) => {
                            return (
                                <MemberCard key={index}
                                    user={elem}
                                    handleActive={handleActive}
                                    suggestions={suggestions}
                                    setSuggestion={setSuggestion}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            );
                        })}</>)}

        </div>
    );

}

export default Members
