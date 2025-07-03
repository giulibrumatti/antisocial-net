import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePost } from "../context/PostContextDef";
import { useAuth } from "../context/AuthContext";
import { PostCard } from "../components/PostCard";
import type { Post } from "../types/Post";


interface PostImage {
  id: number;
  url: string;
}

const PostDetails = () => {
  const { id } = useParams();
  const { posts } = usePost();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [images, setImages] = useState<PostImage[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundPost = posts.find((p) => p.id === Number(id));
      setPost(foundPost || null);
    }
  }, [id, posts]);

  useEffect(() => {
    const fetchExtras = async () => {
      if (!id) return;
      try {
        const resComments = await fetch(`http://localhost:3000/posts/${id}/comments`);
        const dataComments = await resComments.json();
        setComments(dataComments);

        const resImages = await fetch(`http://localhost:3000/postimages/post/${id}`);
        const dataImages = await resImages.json();
        setImages(dataImages);
      } catch (error) {
        console.error("Error al cargar datos del post", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExtras();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const body = {
      body: newComment,
      postId: Number(id),
      userId: user?.id,
    };

    try {
      const res = await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const nuevoComentario = await res.json();
        setComments([...comments, nuevoComentario]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error al enviar comentario", error);
    }
  };

  if (!post || loading) return <div className="text-center mt-5">Cargando publicación...</div>;

  return (
    <div className="container mt-4">
      <PostCard post={post} />
      <div className="my-3">
        <h5>Imágenes</h5>
        {images.length > 0 ? (
          <div className="d-flex gap-3 flex-wrap">
            {images.map((img) => (
              <img key={img.id} src={img.url} alt="post" width="200" />
            ))}
          </div>
        ) : (
          <p>Este post no tiene imágenes.</p>
        )}
      </div>

      <div className="mt-4">
        <h5>Comentarios</h5>
        {comments.length === 0 && <p>No hay comentarios aún.</p>}
        <ul className="list-group">
          {comments.map((c) => (
            <li key={c.id} className="list-group-item">
              {c.body}
            </li>
          ))}
        </ul>
      </div>

      {user && (
        <form className="mt-4" onSubmit={handleCommentSubmit}>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Agregar comentario</label>
            <textarea
              id="comment"
              className="form-control"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default PostDetails;
