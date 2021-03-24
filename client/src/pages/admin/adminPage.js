import React from 'react';
import './adminPage.css'
import { useHistory, Link } from 'react-router-dom';

function AdminPage() {
    const history = useHistory();

    return (
        <div>
            <div className="user-container">
                <Link style={{margin:10}} to="/addKnesset">הוספת חברי כנסת</Link>
                <Link style={{margin:10}} to="/members">כל האזרחים</Link>
                <Link style={{margin:10}} to="/spamSuggestions">הצעות</Link>
            </div>
        </div>
    )
}

export default AdminPage