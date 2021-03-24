import React from "react";
import Subject from "./Subject";
import "./Taknon.css";
import Logo from "./Images/tak_icon.PNG";
function Taknon(props) {
  if (props.tool.tkanon === undefined) {
    return <>Still loading...</>;
  }
  return (
    <div className="taknon scroll">
      <Subject text="תקנון" Icon={Logo} />
      <div className="taknon__data">
        <div className="taknon-right-col">
          <h5 className="h5 h5-tkanon-title">{props.tool.tkanon.title}</h5>
          <h5>{props.tool.tkanon.tkanonNumber}. </h5>
        </div>
        {/* <h5>א.</h5>
        <h5 className="articl">
          5 חברי הכנסת הדורשים לכנס את הכנסת בתקופת הפגרה, בהתאם לסעיף 9(ב( לחוק
          הכנסת, רשאים לפרט בדרישתם נושא אחד או שני נושאים; יושב ראש הכנסת יעמיד
          את הנושאים על סדר יומה של הישיבה, כהצעות לסדר היום; אין באמור כדי
          למנוע מיושב ראש הכנסת להעמיד על סדר יומה של אותה ישיבה נושא אחד או שני
          נושאים נוספים, לפי דרישתם של 25 חברי כנסת אחרים.
        </h5>
        <h5>ב.</h5>
        <h5 className="articl">
          5 חברי הכנסת הדורשים לכנס את הכנסת בתקופת הפגרה, בהתאם לסעיף 9(ב( לחוק
          הכנסת, רשאים לפרט בדרישתם נושא אחד או שני נושאים; יושב ראש הכנסת יעמיד
          את הנושאים על סדר יומה של הישיבה, כהצעות לסדר היום; אין באמור כדי
          למנוע מיושב ראש הכנסת להעמיד על סדר יומה של אותה ישיבה נושא אחד או שני
          נושאים נוספים, לפי דרישתם של 25 חברי כנסת אחרים.
        </h5> */}
        <div className="taknon-left-col">
          {props.tool.tkanon.tkanonDetails.map((section, index) => {
            return (
              <>
                <div className="tkanon-section-item">
                  <h5>{section.sectionTitle}. </h5>
                  <h5 className="articl">{section.sectionContent}</h5>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Taknon;
