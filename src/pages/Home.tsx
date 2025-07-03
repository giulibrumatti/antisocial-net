import { useEffect, useState } from "react";
import Post from "../components/Post/Post.tsx"
import { Banner } from "../components/Banner";
import { AboutUs } from "../components/AboutUs";
import { usePost } from "../context/PostContextDef";



export const Home = () => {
  const { posts, loadPosts } = usePost();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await loadPosts();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container py-4">
      <Banner />
      {loading ? (
        <div className="alert alert-info">Cargando publicaciones...</div>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
      <AboutUs />
    </div>
  );
};
