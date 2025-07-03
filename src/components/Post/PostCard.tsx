import { Link } from "react-router-dom";
import type { Post } from "../../types/Post";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="card mb-3 border border-dark-subtle shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{post.description}</h5>

        {/* Etiquetas */}
        {post.tags && post.tags.length > 0 && (
          <p className="card-text">
            <strong>Etiquetas:</strong>{" "}
            {post.tags.map((tag) => tag.name).join(", ")}
          </p>
        )}

        {/* Comentarios */}
        {post.comments && (
          <p className="card-text">
            💬 {post.comments.length} comentario{post.comments.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Botón Ver más */}
        <Link to={`/post/${post.id}`} className="btn btn-outline-primary btn-sm">
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
