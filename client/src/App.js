import "./App.css";
import React, { useState, useEffect } from "react";
import ParliamentaryTool from "./pages/parliamentaryTool/parliamentaryTool";
import KenosKnesset from "./pages/kenosKnesset/kenosKnesset";
import Normalquery from "./pages/normalquery/normalquery";
import OneMinuteSpeech from "./pages/oneMinuteSpeech/oneMinuteSpeech";
import TrackingBoard from "./pages/trackingBoard/trackingBoard";

import Login from "./pages/loginRegisteration/loginRegisteration";
import Forgetpassword from "./pages/loginRegisteration/forgetpassword";
import Resetpassword from "./pages/resetPassword/resetPassword";
import HaverKnesset from "./pages/haverKnesset/haverKnesset";

import AdminPage from "./pages/admin/adminPage";
import AddKnesset from "./pages/admin/addKnesset";
import Members from "./pages/admin/members";
import SpamSuggestions from "./pages/admin/spamSuggestions";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState({});

  const DEBUG = true;

  useEffect(() => {
    fetch("/user/checkConnection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((r) => r.json())
      .then((data) => {
        setConnected(data.cookie);
        setUser({
          type: data.type,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      });
  }, []);

  function checkConnection() {
    fetch("/user/checkConnection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((r) => r.json())
      .then((data) => {
        setConnected(data.cookie);
        setUser({
          type: data.type,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      });
  }

  return (
    <Router>
      <div>
        <nav className={DEBUG ? "all-tabs" : "all-tabs-hidden"}>
          <ul>
            <li className="active-nav">
              <Link to="/parliamentaryTool">
                parliamentaryTools
              </Link>
            </li>
            <li className="non-active-nav">
              <Link to="/normalquery">
                normalquery
              </Link>
            </li>
            <li className="non-active-nav">
              <Link to="/kenosKnesset">
                kenosKnesset
              </Link>
            </li>
            <li className="non-active-nav">
              <Link to="/oneMinuteSpeech">
                oneMinuteSpeech
              </Link>
            </li>
            <li className="non-active-nav">
              <Link to="/trackingBoard">
                trackingBoard
              </Link>
            </li>
            <li className="non-active-nav">
              <Link to="/loginRegisteration">loginRegisteration</Link>
            </li>
            <li className="non-active-nav">
              <Link to="/forgetpassword">forgetpassword</Link>
            </li>
            <li className="non-active-nav">
              <Link to="/resetPassword">resetPassword</Link>
            </li>
            <li className="non-active-nav">
              <Link to="/haverKnesset">
                haverKnesset
              </Link>
            </li>
            <li className="non-active-nav">
              <Link to="/adminPage">
                adminPage
              </Link>
            </li>
            <li className="non-active-nav">
              <Link to="/addKnesset">
                addKnesset
              </Link>
            </li>
            <li className="non-active-nav">
              <Link to="/members">
                members
              </Link>
            </li>
            <li className="non-active-nav">
              <Link to="/spamSuggestions">
                spamSuggestions
              </Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/parliamentaryTool">
            <Header
              user={user}
              show={true}
              connected={connected}
              setUser={setUser}
              setConnected={setConnected}
              pages={[{ text: "???????? ????????????????????", url: "parliamentaryTool" }]}
            />
            <ParliamentaryTool />
          </Route>
          <Route path="/normalquery">
            <Header
              user={user}
              show={true}
              connected={connected}
              setUser={setUser}
              setConnected={setConnected}
              pages={[
                { text: "???????? ????????????????????", url: "parliamentaryTool" },
                { text: "???????????? ??????????", url: "normalquery" },
              ]}
            />
            <Normalquery />
          </Route>
          <Route path="/kenosKnesset">
            <Header
              user={user}
              show={true}
              connected={connected}
              setUser={setUser}
              setConnected={setConnected}
              pages={[
                { text: "???????? ????????????????????", url: "parliamentaryTool" },
                { text: "?????????? ?????????? ???????? ??????????", url: "kenosKnesset" },
              ]}
            />
            {user.type === "citizen" ? <KenosKnesset /> : <div>you're not allowed</div>}
          </Route>
          <Route path="/oneMinuteSpeech">
            <Header
              user={user}
              show={true}
              connected={connected}
              setUser={setUser}
              setConnected={setConnected}
              pages={[
                { text: "???????? ????????????????????", url: "parliamentaryTool" },
                { text: "???????? ???? ??????", url: "oneMinuteSpeech" },
              ]}
            />
            <OneMinuteSpeech />
          </Route>
          <Route path="/trackingBoard">
            <Header
              user={user}
              show={true}
              connected={connected}
              setUser={setUser}
              setConnected={setConnected}
              pages={[{ text: "?????? ????????", url: "trackingBoard" }]}
            />
            {user.type === "citizen" ? <TrackingBoard /> : <div>you're not allowed</div>}
          </Route>
          <Route path="/loginRegisteration">
            <Header
              user={user}
              show={false}
              connected={false}
              setUser={setUser}
              setConnected={setConnected}
              pages={[{ text: "?????????? ????????????????", url: "loginRegisteration" }]}
            />
            <Login setUser={setUser} setConnected={setConnected} />
          </Route>
          <Route path="/forgetpassword">
            <Header
              user={user}
              show={false}
              connected={false}
              setUser={setUser}
              setConnected={setConnected}
              pages={[
                { text: "?????????? ????????????????", url: "loginRegisteration" },
                { text: "?????????? ??????????", url: "forgetpassword" },
              ]}
            />
            <Forgetpassword />
          </Route>
          <Route path="/resetPassword">
            <Header
              user={user}
              show={false}
              connected={false} 
              setUser={setUser}
              setConnected={setConnected}
              pages={[
                { text: "?????????? ????????????????", url: "loginRegisteration" },
                { text: "?????????? ??????????", url: "resetPassword" },
              ]}
            />
            <Resetpassword />
          </Route>
          <Route path="/haverKnesset">
            <Header
              user={user}
              show={true}
              connected={connected}
              setUser={setUser}
              setConnected={setConnected}
              pages={[{ text: "?????????? ??????", url: "haverKnesset" }]}
            />
            {user.type === "knessetMember" ? <HaverKnesset /> : <div>you're not allowed</div>}
          </Route>
          <Route path="/adminPage">
            <Header
              user={user}
              show={true}
              connected={connected}
              setUser={setUser}
              setConnected={setConnected}
              pages={[{ text: "??????????", url: "adminPage" }]}
            />
            {user.type === "admin" ? <AdminPage /> : <div>you're not allowed</div>}
          </Route>
          <Route path="/addKnesset">
            <Header
              user={user}
              show={true}
              connected={connected}
              setUser={setUser}
              setConnected={setConnected}
              pages={[
                { text: "??????????", url: "adminPage" },
                { text: "?????????? ???????? ????????", url: "addKnesset" },
              ]}
            />
            {user.type === "admin" ? <AddKnesset /> : <div>you're not allowed</div>}
          </Route>
          <Route path="/members">
            <Header
              user={user}
              show={true}
              connected={connected}
              setUser={setUser}
              setConnected={setConnected}
              pages={[
                { text: "??????????", url: "adminPage" },
                { text: "??????????????", url: "members" },
              ]}
            />
            {user.type === "admin" ? <Members /> : <div>you're not allowed</div>}
          </Route>
          <Route path="/spamSuggestions">
            <Header
              user={user}
              show={true}
              connected={connected}
              setUser={setUser}
              setConnected={setConnected}
              pages={[
                { text: "??????????", url: "adminPage" },
                { text: "??????????", url: "spamSuggestions" },
              ]}
            />
            {user.type === "admin" ? <SpamSuggestions /> : <div>you're not allowed</div>}
          </Route>
          <Route path="/">
            <Header
              user={user}
              show={true}
              connected={connected}
              setUser={setUser}
              setConnected={setConnected}
              pages={[{ text: "???????? ????????????????????", url: "parliamentaryTool" }]}
            />
            <ParliamentaryTool />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}
