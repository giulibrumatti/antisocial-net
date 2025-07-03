import React from "react";
import type { Post } from "../types/Post";
import { PostCard } from "../components/Post/PostCard";

interface Props {
  posts: Post[];
}

const Feed: React.FC<Props> = ({ posts }) => (
  <section className="my-4">
    <h2 className="mb-3">Publicaciones recientes</h2>
    <div className="row">
      {posts.map((post) => (
        <div key={post.id} className="col-md-6 mb-4">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  </section>
);

export default Feed