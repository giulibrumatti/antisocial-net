import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Tag {
  id: number;
  name: string;
}

const NewPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/tags")
      .then((res) => setTags(res.data))
      .catch(() => setMessage("❌ Error al cargar etiquetas."));
  }, []);

  const handleImageChange = (index: number, value: string) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!description.trim()) {
      setMessage("❌ La descripción es obligatoria.");
      return;
    }

    if (!user) {
      setMessage("❌ Tenés que iniciar sesión.");
      return;
    }

    try {
      // Crear el post
      const res = await axios.post("/posts", {
        description,
        userId: user.id,
        tagIds: selectedTags,
      });

      const postId = res.data.id;

      // Asociar imágenes
      const validUrls = imageUrls.filter((url) => url.trim() !== "");
      for (const url of validUrls) {
        await axios.post("/postimages", { url, postId });
      }

      setMessage("✅ Publicación creada con éxito.");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      setMessage("❌ Error al crear publicación.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Nueva Publicación</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Descripción *</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Etiquetas</label>
          <div>
            {tags.map((tag) => (
              <label key={tag.id} className="me-3">
                <input
                  type="checkbox"
                  value={tag.id}
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => toggleTag(tag.id)}
                />{" "}
                #{tag.name}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label>Imágenes (opcional)</label>
          {imageUrls.map((url, index) => (
            <input
              key={index}
              type="url"
              className="form-control mb-2"
              placeholder="URL de la imagen"
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
          ))}
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={addImageField}
          >
            + Agregar otra imagen
          </button>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Publicar
        </button>
      </form>
    </div>
  );
};

export default NewPost;
