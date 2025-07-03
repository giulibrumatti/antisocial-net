import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";

const Postear = () => {
  const { user, isAuth, loading: loadingAuth } = useAuth();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loadingAuth && !isAuth) {
      navigate("/login");
    }
  }, [loadingAuth, isAuth, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setMessage("❌ No estás autenticado");
      return;
    }

    if (!description.trim()) {
      setMessage("❌ La descripción no puede estar vacía.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          description: description.trim(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("⛔ Error del backend:", errorData);
        throw new Error(errorData.error || "Error desconocido");
      }

      setMessage("✅ Publicación exitosa");
      setDescription("");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      console.error("Error al publicar:", error);
      setMessage("❌ No se pudo publicar. Revisá la consola.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Crear una publicación</h3>

      {message && <div className="alert alert-info">{message}</div>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Publicar
        </Button>
      </Form>
    </div>
  );
};

export default Postear;
