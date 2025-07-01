import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { signup, errorsContext } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const nickName = (form.elements.namedItem("nickName") as HTMLInputElement)
      ?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;

    const res = await signup({ nickName, email });

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
