import { useState, useEffect } from "react";
import Card from "../components/Card";
import "./Challenges.css";

// Hardcoded challenges data
const hardcodedChallenges = [
  {
    id: "challenge-1",
    role: "Data Heist",
    codename: "Ghost Protocol",
    bio: "Infiltrate Arasaka Tower and extract classified neural enhancement data without triggering security protocols. High risk, high reward mission requiring stealth and hacking expertise.",
  },
  {
    id: "challenge-2",
    role: "Corporate Espionage",
    codename: "Shadow Runner",
    bio: "Gather intelligence on competing mega-corp merger plans. Navigate through corporate networks and social engineering to uncover the truth behind the deal.",
  },
  {
    id: "challenge-3",
    role: "Street Racing Circuit",
    codename: "Neon Lightning",
    bio: "Dominate the underground racing scene in Night City. Modify your ride with illegal tech and outrun corpo security through the neon-lit streets.",
  },
  {
    id: "challenge-4",
    role: "Neural Interface Hack",
    codename: "Mind Walker",
    bio: "Break into a target's cybernetic implants to extract memories and data. Requires advanced netrunning skills and ice-breaking software.",
  },
  {
    id: "challenge-5",
    role: "Black Market Exchange",
    codename: "Chrome Dealer",
    bio: "Establish a network for trading illegal cyberware and combat stims. Build relationships with fixers and avoid corpo crackdowns.",
  },
];

const Challenges = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Set only hardcoded challenges
    setPosts(hardcodedChallenges);
  }, []);

  return (
    <div>
      <div className="header">
        <h1 className="neon-text-green pixel-font">《 MISSION BOARD 》</h1>
        <p className="neon-text-green">
          High-Risk Operations • Corpo Targets • Street Races
        </p>
      </div>
      <div className="ReadPosts racing-stripe">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              role={post.role}
              codename={post.codename}
              bio={post.bio}
            />
          ))
        ) : (
          <h2 className="neon-text-pink pixel-font">
            {"NO MISSIONS AVAILABLE • CHECK BACK LATER ⚡"}
          </h2>
        )}
      </div>
    </div>
  );
};

export default Challenges;
