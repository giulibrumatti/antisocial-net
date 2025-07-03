import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";

interface Tag {
  id: number;
  name: string;
}

const Postear = () => {
  const { user, isAuth, loading: loadingAuth } = useAuth();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loadingAuth && !isAuth) {
      navigate("/login");
    }
  }, [loadingAuth, isAuth, navigate]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/tags") // Simulada
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error("Error al cargar etiquetas", err));
  }, []);

  const handleImageChange = (index: number, value: string) => {
    const urls = [...imageUrls];
    urls[index] = value;
    setImageUrls(urls);
  };

  const handleAddImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !user) return;
    setLoading(true);

    try {
      const postRes = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          description,
          tags: [selectedTag],
        }),
      });

      const newPost = await postRes.json();

      for (const url of imageUrls.filter(Boolean)) {
        await fetch("https://jsonplaceholder.typicode.com/postimages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId: newPost.id,
            url,
          }),
        });
      }

      alert("¡Publicación creada con éxito!");
      navigate("/profile");
    } catch (error) {
      console.error("Error al crear publicación", error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingAuth) return <div className="text-center mt-4">Verificando sesión...</div>;

  return (
    <div className="container mt-4">
      <h2>Crear Nueva Publicación</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="descripcion" className="mb-3">
          <Form.Label>Descripción *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Label>URLs de imágenes (opcional)</Form.Label>
        {imageUrls.map((url, idx) => (
          <Form.Group key={idx} className="mb-2">
            <Form.Control
              type="text"
              placeholder={`URL de imagen ${idx + 1}`}
              value={url}
              onChange={(e) => handleImageChange(idx, e.target.value)}
            />
          </Form.Group>
        ))}
        <Button variant="link" onClick={handleAddImageField}>
          + Agregar otra imagen
        </Button>

        <Form.Group controlId="tags" className="mb-3">
          <Form.Label>Seleccionar etiqueta</Form.Label>
          <Form.Select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            required
          >
            <option value="">-- Seleccioná una etiqueta --</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Publicando..." : "Publicar"}
        </Button>
      </Form>
    </div>
  );
};

export default Postear;


