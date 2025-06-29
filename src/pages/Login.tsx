import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signin, errorsContext } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const nickName = (form.elements.namedItem("nickName") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await signin({ nickName, password });
    if (res.success) {
      navigate("/profile");
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <form style={{ width: "100%", maxWidth: "400px" }}  onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <div className="mb-3">
          <label className="form-label">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            name="nickName"
            id="nickName"
            aria-describedby="nickName"
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" name="password" required />
        </div>
        <Button className="rounded-pill w-100 mt-auto" variant="light" type="submit">
          Iniciar Sesión
        </Button>
        {errorsContext && errorsContext.map((err, i) => <p key={i}>{err}</p>)}
      </form>
    </div>
  );
};

export default Login;
