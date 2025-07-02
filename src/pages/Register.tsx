import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Importar useState

const Register = () => {
  const { signup, errorsContext } = useAuth();
  const navigate = useNavigate();

  // 👉 Usar estado para los campos del formulario
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // 👉 Nuevo estado para la contraseña

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 👉 Enviar los datos del estado, incluyendo la contraseña
    const res = await signup({ nickName, email, password });

    if (res.success) {
      navigate("/profile");
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Registro de Usuario</h2>

        <div className="mb-3">
          <label className="form-label">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="nickName"
            name="nickName"
            required
            value={nickName} // 👉 Vincular con el estado
            onChange={(e) => setNickName(e.target.value)} // 👉 Actualizar estado
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            value={email} // 👉 Vincular con el estado
            onChange={(e) => setEmail(e.target.value)} // 👉 Actualizar estado
          />
        </div>

        {/* 👉 Nuevo campo para la contraseña */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            value={password} // 👉 Vincular con el estado
            onChange={(e) => setPassword(e.target.value)} // 👉 Actualizar estado
          />
        </div>

        <Button
          className="rounded-pill w-100 mt-auto"
          variant="light"
          type="submit"
        >
          Registrar
        </Button>

        {errorsContext && (
          <div className="mt-3 text-danger">
            {errorsContext.map((err, i) => (
              <p className="text-danger" key={i}>
                {err}
              </p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
