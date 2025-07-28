import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "./MemberDetail.css";

function MemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hardcoded stats that will be shown for any crew member
  const hardcodedStats = {
    missionsCompleted: 12,
    totalKills: 78,
    raceWins: 15,
    hackingLevel: 9,
    streetCred: 850,
    neuralLinkStatus: "ONLINE",
    combatRating: "A+",
    stealthRating: "S",
    drivingSkill: 85,
    techSkill: 92,
  };

  useEffect(() => {
    const fetchMemberDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("Crew")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching member details:", error);
          setError("Failed to fetch crew member details");
        } else if (data) {
          setMemberData(data);
        } else {
          setError(`Crew member with ID "${id}" not found`);
        }
      } catch (error) {
        console.error("Error fetching member details:", error);
        setError("Failed to fetch crew member details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMemberDetails();
    }
  }, [id]);

  if (loading)
    return (
      <div className="cyber-terminal">
        <p className="loading-text">ACCESSING CREW DATABASE...</p>
      </div>
    );

  if (error)
    return (
      <div className="cyber-terminal">
        <p className="neon-text-pink">ERROR: {error}</p>
      </div>
    );

  if (!memberData)
    return (
      <div className="cyber-terminal">
        <p className="neon-text-orange">NO CREW MEMBER DATA AVAILABLE</p>
      </div>
    );

  return (
    <div className="member-detail-container">
      <div className="header">
        <h1 className="neon-text-green pixel-font">
          《 CREW MEMBER PROFILE 》
        </h1>
        <p className="neon-text-green">
          Neural Interface • Combat Stats • Mission History
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="cyber-submit-btn update-btn"
        style={{ width: "auto", padding: "10px 20px", marginBottom: "20px" }}
      >
        <span className="neon-text-cyan">⟨ RETURN TO DATABASE ⟩</span>
      </button>

      {/* Edit Button */}
      <button
        onClick={() => navigate(`/edit/${id}`)}
        className="cyber-submit-btn update-btn"
        style={{ width: "auto", padding: "10px 20px", marginBottom: "20px" }}
      >
        <span className="neon-text-cyan">⟨ EDIT PROFILE ⟩</span>
      </button>

      {/* Member Header */}
      <div className="member-detail-card">
        <div className="member-detail-header">
          <div className="member-avatar">
            <span className="neon-text-green pixel-font">
              {memberData.codename?.charAt(0) || "X"}
            </span>
          </div>
          <div className="member-detail-info">
            <h2 className="neon-text-green">{memberData.codename}</h2>
            <p className="neon-text-purple">Role: {memberData.role}</p>
            <p className="neon-text-cyan">
              Status: <span className="status-online">ACTIVE</span>
            </p>
            {memberData.color && (
              <p
                className={`neon-text-${
                  memberData.color?.replace("neon-", "") || "cyan"
                }`}
              >
                Neural Interface:{" "}
                {memberData.color?.replace("neon-", "").toUpperCase()}
              </p>
            )}
            {/* Debug: Show raw color value */}
            {console.log("Color from database:", memberData.color)}
            {!memberData.color && (
              <p className="neon-text-orange">
                Neural Interface: NO COLOR DATA
              </p>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div className="member-bio-section">
          <h3 className="neon-text-orange pixel-font">OPERATIVE PROFILE</h3>
          <p className="member-bio">{memberData.bio}</p>
        </div>

        {/* Member Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <h4 className="neon-text-cyan">MISSIONS</h4>
            <span className="stat-value neon-text-green">
              {hardcodedStats.missionsCompleted}
            </span>
          </div>
          <div className="stat-card">
            <h4 className="neon-text-cyan">ELIMINATIONS</h4>
            <span className="stat-value neon-text-pink">
              {hardcodedStats.totalKills}
            </span>
          </div>
          <div className="stat-card">
            <h4 className="neon-text-cyan">RACE WINS</h4>
            <span className="stat-value neon-text-orange">
              {hardcodedStats.raceWins}
            </span>
          </div>
          <div className="stat-card">
            <h4 className="neon-text-cyan">STREET CRED</h4>
            <span className="stat-value neon-text-purple">
              {hardcodedStats.streetCred}
            </span>
          </div>
        </div>

        {/* Detailed Stats Table */}
        <div className="detailed-stats">
          <h3 className="neon-text-orange pixel-font">DETAILED ANALYTICS</h3>
          <table className="cyber-table">
            <tbody>
              <tr>
                <td className="neon-text-purple">Hacking Level</td>
                <td className="neon-text-cyan">
                  {hardcodedStats.hackingLevel}/10
                </td>
              </tr>
              <tr>
                <td className="neon-text-purple">Combat Rating</td>
                <td className="neon-text-green">
                  {hardcodedStats.combatRating}
                </td>
              </tr>
              <tr>
                <td className="neon-text-purple">Stealth Rating</td>
                <td className="neon-text-pink">
                  {hardcodedStats.stealthRating}
                </td>
              </tr>
              <tr>
                <td className="neon-text-purple">Driving Skill</td>
                <td className="neon-text-orange">
                  {hardcodedStats.drivingSkill}%
                </td>
              </tr>
              <tr>
                <td className="neon-text-purple">Tech Skill</td>
                <td className="neon-text-cyan">{hardcodedStats.techSkill}%</td>
              </tr>
              <tr>
                <td className="neon-text-purple">Neural Link</td>
                <td className="status-online">
                  {hardcodedStats.neuralLinkStatus}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MemberDetail;
