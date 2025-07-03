import { Link } from "react-router-dom";
import type { Post } from "../../types/Post";

interface Props {
  posts: Post[];
}

export const PostCard = ({ post }: { post: Post }) => (
  <div className="card mb-3 border-0 border-bottom">
    <div className="card-body d-flex">
      <img
        src={post.imageUrl}
        alt={post.User.nickName}
        className="rounded-circle me-3"
        width={48}
        height={48}
      />
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{post.User.nickName}</strong>{" "}
            <span className="text-muted">{post.tags}</span>
          </div>
          <Link to={`/post/${post.id}`} className="btn btn-sm btn-outline-dark">
            Ver más
          </Link>
        </div>

        <p className="mt-2 mb-2">{post.description}</p>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Contenido del post"
            className="img-fluid rounded mb-2"
          />
        )}

        <div className="text-muted small">
        
          
        </div>
      </div>
    </div>
  </div>
);