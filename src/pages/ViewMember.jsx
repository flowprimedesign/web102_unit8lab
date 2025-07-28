import { useState, useEffect } from "react";
import Card from "../components/Card";
import { supabase } from "../client";

const ViewMember = () => {
  const [posts, setPosts] = useState([]);

  const viewMember = async () => {
    const { data } = await supabase
      .from("Crew")
      .select("*")
      .order("created_at", { ascending: false });

    // set state of posts
    setPosts(data || []);
  };

  useEffect(() => {
    viewMember();
  }, []);

  return (
    <div>
      <div className="header">
        <h1 className="neon-text-green pixel-font">《 CREW DATABASE 》</h1>
        <p className="neon-text-green">
          Active Operatives • Neural Link Status: ONLINE
        </p>
      </div>
      <div className="ReadPosts matrix-bg">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              role={post.role}
              codename={post.codename}
              bio={post.bio}
              color={post.color}
            />
          ))
        ) : (
          <h2 className="neon-text-pink pixel-font">
            {"NO CREW FOUND • RECRUITING ACTIVE �"}
          </h2>
        )}
      </div>
    </div>
  );
};

export default ViewMember;
