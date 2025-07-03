import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post} from "../types/Post.ts";
import type { Comment } from "../types/Comment.ts"


export const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const postData = await postRes.json();
        const enrichedPost: Post = {
          id: postData.id,
          username: `Usuario ${postData.userId}`,
          handle: `@usuario${postData.userId}`,
          avatarUrl: `https://i.pravatar.cc/150?u=${postData.userId}`,
          content: postData.body,
          imageUrl: postData.id % 2 === 0 ? `https://picsum.photos/id/${postData.id + 20}/600/300` : undefined,
          tags: ["detalle", postData.id % 2 === 0 ? "imagen" : "texto"],
        };
        setPost(enrichedPost);

        const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error cargando datos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          name: "Nuevo comentario",
          email: "anon@ejemplo.com",
          body: newComment,
        }),
      });

      const data = await res.json();
      setComments((prev) => [...prev, data]);
      setNewComment("");
    } catch (error) {
      console.error("Error al enviar comentario", error);
    }
  };

  if (loading) return <div className="container mt-4 alert alert-info">Cargando publicación...</div>;
  if (!post) return <div className="container mt-4 alert alert-danger">Publicación no encontrada.</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex mb-3">
        <img src={post.avatarUrl} alt="avatar" className="rounded-circle me-3" width={48} height={48} />
        <div>
          <strong>{post.username}</strong> <span className="text-muted">{post.handle}</span>
        </div>
      </div>

      <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="post" className="img-fluid rounded mb-3" />}
      <p className="text-muted small">Etiquetas: {post.tags.join(", ")}</p>

      <hr />
      <h5>Comentarios</h5>
      {comments.map((c) => (
        <div key={c.id} className="mb-3">
          <strong>{c.name}</strong> <span className="text-muted">({c.email})</span>
          <p>{c.body}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="comentario" className="form-label">Nuevo comentario</label>
          <textarea
            id="comentario"
            className="form-control"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

