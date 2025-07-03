import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../context/PostContextDef";
import type { Comment as CommentType } from "../../types/Post";

interface CommentsProps {
  postId: number;
  comments: CommentType[];
}

const Comments = ({ postId, comments }: CommentsProps) => {
  const { user } = useAuth();
  const { addComment, editComment, deleteComment } = usePost();

  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const [showComments, setShowComments] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleAddComment = async () => {
    if (!user || newComment.trim() === "") return;
    await addComment(postId, newComment);
    setNewComment("");
    setShowComments(true);
  };

  const handleEditComment = async (commentId: number) => {
    if (editedContent.trim() === "") return;
    await editComment(postId, commentId, editedContent);
    setEditingId(null);
    setEditedContent("");
  };

  const handleDeleteComment = async (commentId: number) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este comentario?")
    ) {
      await deleteComment(postId, commentId);
    }
  };

  return (
    <div className="mb-3">
      {comments.length > 0 && !showComments && (
        <button
          className="btn btn-sm btn-outline-primary me-2 mb-2"
          onClick={() => setShowComments(true)}
        >
          Ver comentarios
        </button>
      )}

      {user && !showForm && (
        <button
          className="btn btn-sm btn-outline-success mb-2"
          onClick={() => setShowForm(true)}
        >
          Añadir comentario
        </button>
      )}

      {(showComments || showForm) && (
        <>
          {comments.length > 0 && showComments ? (
            comments.map((comment) => (
              <div key={comment.id} className="mb-2 border-bottom pb-2">
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
          ) : comments.length === 0 ? (
            <p>No hay comentarios aún.</p>
          ) : null}

          {user && showForm && (
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
        </>
      )}
    </div>
  );
};

export default Comments;
