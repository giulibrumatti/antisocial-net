import portada from "../../assets/portada.jpg";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import type { Post as PostType } from "../../types/Post";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  return (
    <div className="container">
      <Card className="w-100 mb-3">
        <Card.Body>
          <Card.Title>{post.User.nickName}</Card.Title>
          <Card.Text>{post.description}</Card.Text>
        </Card.Body>
        <Card.Img variant="top" src={portada} />
        <Card.Body className="d-flex justify-content-between">
          <Button className="rounded-pill d-flex align-items-center justify-content-around" variant="primary">
            👍 Like
          </Button>
          <Button className="rounded-pill d-flex align-items-center justify-content-around" variant="primary">
            🔁 Repostear
          </Button>
          <Button className="rounded-pill d-flex align-items-center justify-content-around" variant="primary">
            💬 Comentar
          </Button>
          <Button className="rounded-pill d-flex align-items-center justify-content-around" variant="primary">
            🔖 Guardar
          </Button>
          <Button className="rounded-pill d-flex align-items-center justify-content-around" variant="primary">
            📤 Compartir
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;