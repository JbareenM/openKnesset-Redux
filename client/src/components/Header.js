import "./Header.css";
import "./Breadcrumb";
import Breadcrumb from "./Breadcrumb";
import { useHistory } from "react-router";
import PersonIcon from "@material-ui/icons/Person";

function Header(props) {
  const history = useHistory();

  function loginRegisteration() {
    history.push("loginRegisteration");
  }

  return (
    <div>
      <div className="App-header">
        <div className="Header">
          <div className="row">
            <div id="logo" className="span4 clearfix">
              <h1>
                <a href="https://oknesset.org/">
                  <img
                    src="https://oknesset.org/static/img/oknesset-logo.png"
                    alt="oknesset-logo"
                  />
                  <span className="main-title">כנסת פתוחה</span>
                </a>
              </h1>
            </div>
          </div>
        </div>

        <ul className="nav nav-pills">
          <li id="nav-parties">
            <a href={props.user.type === "admin" ? "/members" : "#"}>ח'כים וסיעות</a>
          </li>  
          <li id="nav-committees">
            <a href={props.user.type === "admin" ? "#" : "#"}>ועדות</a>
          </li>
          <li id="nav-committees">
            <a href={props.user.type === "admin" ? "#" : "./parliamentaryTool"}>כלים פרלמנטריים</a>
          </li>
          {props.show ? (
            props.connected ? (
              <li className="left-nav" id="nav-committees">
                <PersonIcon style={{ color: "blue" }} />
                <label>
                  {(props.user.type === "knessetMember"
                    ? "ח״כ"
                    : props.user.type === "admin"
                    ? "מנהל"
                    : "אזרח") +
                    " " +
                    props.user.firstName +
                    " " +
                    props.user.lastName}
                </label>
              </li>
            ) : (
              <li className="left-nav" id="nav-committees">
                <PersonIcon style={{ color: "blue" }} />
                <label onClick={loginRegisteration}>התחבר למערכת</label>
              </li>
            )
          ) : null}
        </ul>
      </div>
      <Breadcrumb
        breadcrumbList={props.pages}
        userType={props.user.type}
        connected={props.connected}
      />
    </div>
  );
}

export default Header;
