import "./App.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import ViewMember from "./pages/ViewMember";
import Challenges from "./pages/Challenges";
import CreateMember from "./pages/CreateMember";
import EditMember from "./pages/EditMember";
import MemberDetail from "./components/MemberDetail";
import { Link } from "react-router-dom";
import SideNav from "./components/SideNav";

const App = () => {
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ViewMember />,
    },
    {
      path: "/challenges",
      element: <Challenges />,
    },
    {
      path: "/edit/:id",
      element: <EditMember />,
    },
    {
      path: "/member/:id",
      element: <MemberDetail />,
    },
    {
      path: "/new",
      element: <CreateMember />,
    },
  ]);

  return (
    <div>
      <SideNav />
      <div className="main-content">
        <div className="App">
          <div className="header">
            <h1>Cyberpunk GP</h1>
            <p>Build a Crew to tackle the most extreme high tech challenges.</p>
            {/* <Link to="/">
              <button className="headerBtn">
                {" "}
                Explore High Tech Challenges 🔍{" "}
              </button>
            </Link>
            <Link to="/new">
              <button className="headerBtn"> Add New Crew Members 🏆 </button>
            </Link> */}
          </div>
          {element}
        </div>
      </div>
    </div>
  );
};

export default App;
