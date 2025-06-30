import React from "react";
import type { Post } from "../types/Post";
import { Link } from "react-router-dom";

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => (
  <div className="card h-100">
    <div className="card-body">
      <h5 className="card-title">{post.title}</h5>
      <p className="card-text">{post.body}</p>
      <Link to={`/post/${post.id}`} className="btn btn-primary">
        Ver más
      </Link>
    </div>
  </div>
);