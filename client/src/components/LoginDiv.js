import "./LoginDiv.css";
import Subject from "./Subject";
import at from "./Images/at.PNG";

//import images

function LoginDiv() {
  return (
    <div className="recomnde login-div">
    <Subject  Icon={at} text="הגש הצעה" />
    <div className="message-container login-div ">
        <h1 className="message-text">התחבר כאזרח על מנת להגיש הצעה</h1>
        <a href="./loginRegisteration" ><h4 className="message-login">התחברות \ הרשמה</h4> </a>
    </div>
    </div>
  );
}

export default LoginDiv;
