import "./Cards.css";
import { Link } from "react-router-dom";

function Cards(props) {
  return (
    <div className="cards">
      {props.tools.map((tool, index) => {
        return (
          <div className="card" key={index}>
            <Link to={tool.redirectTo}>
              <h2 className="title">{tool.title}</h2>
            </Link>
            <p className="content"> {tool.subTitle} </p>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
