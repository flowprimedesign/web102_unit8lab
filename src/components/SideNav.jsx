import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="side-nav">
      <h2>Crew Navigation</h2>
      <Link to="/">
        <button className="headerBtn"> View Crew Members � </button>
      </Link>
      <Link to="/challenges">
        <button className="headerBtn"> Explore Challenges 🔍 </button>
      </Link>
      <Link to="/new">
        <button className="headerBtn"> Add New Crew Members 🏆 </button>
      </Link>
    </div>
  );
}

export default SideNav;
