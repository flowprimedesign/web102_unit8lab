import { useState } from "react";
import "./CreateMember.css";
import { supabase } from "../client";

const CreateMember = () => {
  const [post, setPost] = useState({
    role: "",
    codename: "",
    bio: "",
    color: "",
  });

  const createMember = async (event) => {
    event.preventDefault();

    try {
      const { error } = await supabase
        .from("Crew")
        .insert({
          role: post.role,
          codename: post.codename,
          bio: post.bio,
          color: post.color,
        })
        .select();

      if (error) {
        console.error("Error creating crewmember:", error);
        return;
      }

      // Reset form after successful submission
      setPost({ role: "", codename: "", bio: "", color: "" });

      // Redirect after success
      window.location = "/";
    } catch (err) {
      console.error("Unexpected error:", err);
    }
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

  return (
    <div className="create-member-container">
      <div className="header">
        <h1 className="neon-text-green pixel-font">
          《 NEW RECRUIT REGISTRATION 》
        </h1>
        <p className="neon-text-green">
          Neural Interface Calibration • Biometric Scan • Clearance Level
          Assignment
        </p>
      </div>

      <div className="cyber-form-container">
        <form onSubmit={createMember} className="cyber-form matrix-bg">
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
              required
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
              required
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
              required
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
              required
            ></textarea>
          </div>

          <button type="submit" className="cyber-submit-btn">
            <span className="neon-text-green pixel-font">
              ⟨ INITIALIZE RECRUIT ⟩
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMember;
