// import React from "react";
import type { Post } from "../types/Post";
import { Link } from "react-router-dom";

export const PostCard = ({ post }: { post: Post }) => (
  <div className="card mb-3 border-0 border-bottom">
    <div className="card-body d-flex">
      <img
        src={post.avatarUrl}
        alt={post.username}
        className="rounded-circle me-3"
        width={48}
        height={48}
      />
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{post.username}</strong>{" "}
            <span className="text-muted">{post.handle}</span>
          </div>
          <Link to={`/post/${post.id}`} className="btn btn-sm btn-outline-dark">
            Ver más
          </Link>
        </div>

        <p className="mt-2 mb-2">{post.content}</p>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Contenido del post"
            className="img-fluid rounded mb-2"
          />
        )}

        <div className="text-muted small">
        
          <span>🏷️ {post.tags.join(", ")}</span>
        </div>
      </div>
    </div>
  </div>
);

