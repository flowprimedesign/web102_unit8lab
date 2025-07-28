import { useState } from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const [count, setCount] = useState(0);
  const updateCount = () => {
    setCount((count) => count + 1);
  };

  // Determine if this is a challenge card or crew card
  const isChallenge = props.id && String(props.id).startsWith("challenge-");
  const cardClass = isChallenge
    ? "Card challenge-card matrix-bg"
    : "Card crew-card";

  return (
    <div className={cardClass}>
      {!isChallenge && (
        <Link to={"edit/" + props.id}>
          <div className="moreButton" title="Edit Member">
            <span className="edit-icon">⚙</span>
          </div>
        </Link>
      )}
      <h2 className="title">
        {isChallenge ? props.role : "Role: " + props.role}
      </h2>
      <h3 className="author">
        {isChallenge ? props.codename : "Codename: " + props.codename}
      </h3>
      {!isChallenge && props.color && (
        <p
          className={`neon-text-${props.color?.replace("neon-", "") || "cyan"}`}
          style={{
            fontSize: "14px",
            margin: "5px 0",
            fontFamily: "var(--font-pixel)",
          }}
        >
          Interface: {props.color?.replace("neon-", "").toUpperCase()}
        </p>
      )}
      <p className="description">
        {isChallenge ? props.bio : "Bio: " + props.bio}
      </p>

      <div className="card-buttons">
        <button className="betButton" onClick={updateCount}>
          {isChallenge ? "🚀 Accept Mission" : "👍 Mission Count"}: {count}
        </button>

        {!isChallenge && (
          <Link to={`/member/${props.id}`}>
            <button className="detail-button">📊 View Profile</button>
          </Link>
        )}
      </div>

      {isChallenge && <div className="racing-stripe"></div>}
    </div>
  );
};

export default Card;
