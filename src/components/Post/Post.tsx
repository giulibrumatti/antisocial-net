import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import type { Post as PostType } from "../../types/Post";
import Comments from "./Comments";
import { useState } from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="container">
      <Card className="w-100 mb-3">
        <Card.Body>
          <Card.Title>{post.User.nickName}</Card.Title>
          <Card.Text>{post.description}</Card.Text>
        </Card.Body>
        <Card.Body className="d-flex justify-content-between">
          <Button
            variant={liked ? "dark" : "light"}
            onClick={toggleLike}
            className="d-flex align-items-center justify-content-center rounded-circle p-2"
            style={{ width: "40px", height: "40px" }}
          >
            {liked ? (
              <HeartFill color="white" size={20} />
            ) : (
              <Heart color="black" size={20} />
            )}
          </Button>
        </Card.Body>
        <Card.Body className="d-flex justify-content-between">
          <Comments postId={post.id} comments={post.comments || []} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;