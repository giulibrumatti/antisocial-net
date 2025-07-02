import portada from "../../assets/portada.jpg";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import type { Post as PostType } from "../../types/Post";
import { useState } from "react";
import { usePost } from "../../context/PostContextDef";
import { useAuth } from "../../context/AuthContext"; // Asumo que AuthContext es necesario para el usuario

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  const { user } = useAuth(); // Obtén el usuario del contexto de autenticación
  // Importa las funciones de comentarios del contexto de posts
  const { addComment, editComment, deleteComment } = usePost();

  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const handleAddComment = async () => {
    if (!user || newComment.trim() === "") return;

    // Llamamos a la función del contexto que ahora maneja la API
    await addComment(post.id, newComment);
    setNewComment(""); // Limpiar el input después de comentar
  };

  const handleEditComment = async (commentId: number) => {
    if (editedContent.trim() === "") return;
    // Llamamos a la función del contexto que ahora maneja la API
    await editComment(post.id, commentId, editedContent);
    setEditingId(null); // Salir del modo edición
    setEditedContent(""); // Limpiar el input de edición
  };

  const handleDeleteComment = async (commentId: number) => {
    // Confirmación antes de eliminar
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este comentario?")
    ) {
      await deleteComment(post.id, commentId);
    }
  };

  return (
    <div className="container">
      <Card className="w-100 mb-3">
        <Card.Body>
          <Card.Title>{post.User.nickName}</Card.Title>
          <Card.Text>{post.description}</Card.Text>
        </Card.Body>
        <Card.Img variant="top" src={portada} />
        <Card.Body className="d-flex justify-content-between">
          {/* Botones de interacción con el post (Like, Repostear, Comentar, Guardar, Compartir) */}
          <Button
            className="rounded-pill d-flex align-items-center justify-content-around"
            variant="primary"
          >
            👍 Like
          </Button>
          <Button
            className="rounded-pill d-flex align-items-center justify-content-around"
            variant="primary"
          >
            🔁 Repostear
          </Button>
          <Button
            className="rounded-pill d-flex align-items-center justify-content-around"
            variant="primary"
          >
            💬 Comentar
          </Button>
          <Button
            className="rounded-pill d-flex align-items-center justify-content-around"
            variant="primary"
          >
            🔖 Guardar
          </Button>
          <Button
            className="rounded-pill d-flex align-items-center justify-content-around"
            variant="primary"
          >
            📤 Compartir
          </Button>
        </Card.Body>
      </Card>

      {/* Sección de comentarios */}
      <div className="mb-3">
        <h6>Comentarios:</h6>
        {/* Muestra los comentarios si existen, si no, muestra un mensaje */}
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.id} className="mb-2 border-bottom pb-2">
              {/* Muestra el nombre del usuario que hizo el comentario (asumiendo que comment.User existe y tiene nickName) */}
              <small className="text-muted">
                {comment.User?.nickName || "Usuario desconocido"} dice:
              </small>
              {editingId === comment.id ? (
                <>
                  <input
                    className="form-control mb-1"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-success me-1"
                    onClick={() => handleEditComment(comment.id)}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setEditingId(null)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-1">{comment.content}</p>
                  {/* Solo muestra los botones de editar/eliminar si el comentario es del usuario logueado */}
                  {user?.id === comment.userId && (
                    <>
                      <button
                        className="btn btn-sm btn-warning me-1"
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditedContent(comment.content);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}

        {/* Formulario para añadir un nuevo comentario */}
        {user && ( // Solo muestra el campo si hay un usuario logueado
          <div className="mt-3">
            <input
              className="form-control mb-2"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribí un comentario..."
            />
            <button className="btn btn-primary" onClick={handleAddComment}>
              Comentar
            </button>
          </div>
        )}
      </div>

      {/* Editar nickname (opcional) - Esto se manejará mejor en Profile.tsx */}
      {user && user.id === post.User.id && (
        <div className="mb-4">
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              // Esta lógica debería moverse a Profile.tsx y usar el AuthContext para una mejor gestión
              const nuevo = prompt("Nuevo nickname");
              if (nuevo) {
                const updatedUser = { ...user, nickName: nuevo };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                window.location.reload(); // Considera usar una función de tu AuthContext para actualizar el usuario
              }
            }}
          >
            Editar mi nombre de usuario
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
