import  { useEffect, useState } from "react";
import { Feed } from "../components/feed";
import { Banner } from "../components/Banner";
import { AboutUs } from "../components/AboutUs";
import { Highlight } from "../components/Highlight";
import type { Post} from "../types/Post.ts";

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los posts", error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container py-4">
      <Banner />
      <Highlight />
      {loading ? (
        <div className="alert alert-info">Cargando publicaciones...</div>
      ) : (
        <Feed posts={posts} />
      )}
      <AboutUs />
    </main>
  );
}