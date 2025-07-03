import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePost } from "../context/PostContextDef";
import { useAuth } from "../context/AuthContext";
import { PostCard } from "../components/PostCard";
import type { Post } from "../types/Post";
import type { Comment } from "../types/Comment";

// tipo de dato para las imágenes del post
interface PostImage {
  id: number;
  url: string;
}

const PostDetails = () => {
  const { id } = useParams(); // obtengo el id del post de la URL
  const { posts } = usePost(); // traigo todos los posts desde el contexto
  const { user } = useAuth(); // obtengo el usuario actual
  const [post, setPost] = useState<Post | null>(null); // guardo el post actual
  const [comments, setComments] = useState<Comment[]>([]); // comentarios del post
  const [images, setImages] = useState<PostImage[]>([]); // imágenes del post
  const [newComment, setNewComment] = useState(""); // texto del nuevo comentario
  const [loading, setLoading] = useState(true); // estado de carga

  // busco el post por id en los posts ya cargados
  useEffect(() => {
    if (id) {
      const foundPost = posts.find((p) => p.id === Number(id));
      setPost(foundPost || null);
    }
  }, [id, posts]);

  // traigo los comentarios e imágenes del post desde la API
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

  // función para enviar un nuevo comentario
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      const res = await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          userId: user.id,
          postId: post?.id,
        }),
      });

      if (res.ok) {
        const newCom = await res.json();
        setComments((prev) => [...prev, newCom]);
        setNewComment("");
      }
    } catch (err) {
      console.error("Error al comentar:", err);
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando...</p>;

  if (!post) return <p className="text-center mt-5">Post no encontrado</p>;

  return (
    <div className="container mt-4">
      {/* usamos el mismo componente que en el feed */}
      <PostCard post={post} />

      {/* imágenes del post */}
      {images.length > 0 && (
        <div className="my-3">
          <h5>Imágenes</h5>
          <div className="d-flex flex-wrap gap-3">
            {images.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt="imagen del post"
                className="img-thumbnail"
                style={{ maxWidth: "300px" }}
              />
            ))}
          </div>
        </div>
      )}

      {/* comentarios */}
      <div className="mt-4">
        <h5>Comentarios ({comments.length})</h5>
        <ul className="list-group">
          {comments.map((c) => (
            <li key={c.id} className="list-group-item">
              <strong>{c.User?.nickName}:</strong> {c.content}
            </li>
          ))}
        </ul>
      </div>

      {/* formulario para comentar */}
      {user && (
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="newComment" className="form-label">
              Agregar comentario
            </label>
            <textarea
              className="form-control"
              id="newComment"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Comentar
          </button>
        </form>
      )}
    </div>
  );
};

export default PostDetails;
