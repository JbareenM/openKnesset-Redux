import "./Breadcrumb.css";
import { Link, useHistory } from "react-router-dom";

function Breadcrumb(props) {
  const history = useHistory();

  function test() {
    console.log("disconnect");
    fetch("/user/deleteCookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log("connected: ", props.connected);
        console.log(data);
        history.push("loginRegisteration");
      });
  }

  return (
    <div className="Header">
      <section className="secondary-nav-bar">
        <div className="path">
          <a href="https://oknesset.org/"> דף הבית </a>
          {props.breadcrumbList.map((title, index) => {
            return (
              <Link className="current-tab-name" to={title.url} key={index}>
                / {title.text}
              </Link>
            );
          })}
        </div>
        {props.connected ? (
          <div className="user-links">
            <a className="disconnect" href="#" onClick={test}>
              {" "}
              התנתק{" "}
            </a>
            |
            <a
              className="link"
              href={
                props.userType === "knessetMember"
                  ? "haverKnesset"
                : props.userType === "citizen"
                  ? "trackingBoard"
                  : "#"
              }
            >
              {" "}
              {props.userType === "knessetMember"
                ? "מערכת ח״כ"
                : "לוח מעקב"}{" "}
            </a>
          </div>
        ) : (
          <div></div>
        )}
      </section>
    </div>
  );
}

export default Breadcrumb;
