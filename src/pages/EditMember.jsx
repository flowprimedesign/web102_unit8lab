import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditMember.css";
import { supabase } from "../client";

const EditMember = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: null,
    role: "",
    codename: "",
    bio: "",
    color: "",
  });

  const editMember = async (event) => {
    event.preventDefault();

    await supabase
      .from("Crew")
      .update({
        role: post.role,
        codename: post.codename,
        bio: post.bio,
        color: post.color,
      })
      .eq("id", id);

    window.location = "/";
  };

  const deleteMember = async (event) => {
    event.preventDefault();

    await supabase.from("Crew").delete().eq("id", id);

    window.location = "/";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Fetch existing member data when component loads
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const { data, error } = await supabase
          .from("Crew")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching member data:", error);
        } else if (data) {
          setPost({
            id: data.id,
            role: data.role || "",
            codename: data.codename || "",
            bio: data.bio || "",
            color: data.color || "",
          });
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    if (id) {
      fetchMemberData();
    }
  }, [id]);

  return (
    <div className="edit-member-container">
      <div className="header">
        <h1 className="neon-text-green pixel-font">
          《 OPERATIVE PROFILE UPDATE 》
        </h1>
        <p className="neon-text-green">
          Neural Interface Recalibration • Security Clearance Modification
        </p>
      </div>

      <div className="cyber-form-container">
        <form className="cyber-form matrix-bg">
          <div className="form-section">
            <label htmlFor="role" className="cyber-label neon-text-purple">
              ◆ ROLE DESIGNATION
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={post.role}
              onChange={handleChange}
              placeholder="e.g., Netrunner, Street Samurai, Techie..."
              className="cyber-input"
            />
          </div>

          <div className="form-section">
            <label htmlFor="codename" className="cyber-label neon-text-purple">
              ◆ CODENAME
            </label>
            <input
              type="text"
              id="codename"
              name="codename"
              value={post.codename}
              onChange={handleChange}
              placeholder="e.g., Ghost, Zero Cool, Phoenix..."
              className="cyber-input"
            />
          </div>

          <div className="form-section">
            <label htmlFor="color" className="cyber-label neon-text-purple">
              ◆ NEURAL INTERFACE COLOR
            </label>
            <select
              id="color"
              name="color"
              value={post.color}
              onChange={handleChange}
              className="cyber-input"
            >
              <option value="">Select Interface Color...</option>
              <option value="neon-cyan">Cyan Matrix</option>
              <option value="neon-purple">Purple Neural</option>
              <option value="neon-green">Green Code</option>
              <option value="neon-orange">Orange Circuit</option>
              <option value="neon-pink">Pink Chrome</option>
            </select>
          </div>

          <div className="form-section">
            <label htmlFor="bio" className="cyber-label neon-text-purple">
              ◆ OPERATIVE PROFILE
            </label>
            <textarea
              rows="6"
              cols="50"
              id="bio"
              name="bio"
              value={post.bio}
              onChange={handleChange}
              placeholder="Background, skills, specializations, augmentations..."
              className="cyber-textarea"
            ></textarea>
          </div>

          <div className="button-group">
            <button
              type="submit"
              onClick={editMember}
              className="cyber-submit-btn update-btn"
            >
              <span className="neon-text-cyan pixel-font">
                ⟨ UPDATE PROFILE ⟩
              </span>
            </button>
            <button
              type="button"
              className="cyber-submit-btn delete-btn"
              onClick={deleteMember}
            >
              <span className="neon-text-pink pixel-font">
                ⟨ TERMINATE ACCESS ⟩
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMember;
