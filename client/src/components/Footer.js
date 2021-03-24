import "./Footer.css";

//import images
import sadna from "../images/sadna.png";

function Footer() {
  return (
    <div>
      <footer>
        <div className="foot">
          <ul>
            <li>
              <a href="#">ח"כים וסיעות</a>
            </li>
            <li>
              <a href="#">ועדות</a>
            </li>
            <li>
              <a href="#">כלים פרלמנטריים</a>
            </li>
          </ul>
        </div>

        <p>כנסת פתוחה הוא פרוייקט שמטרתו לחשוף את פעילות הכנסת לציבור</p>

        <div className="le-footer">
          <h3>
            <img src={sadna} alt="הסדנא לידע ציבורי" />
            <span>פרוייקט של</span>
            <a href="http://www.hasadna.org.il">הסדנא לידע ציבורי</a>
          </h3>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
