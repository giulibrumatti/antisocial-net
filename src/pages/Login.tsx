import { Button } from "react-bootstrap";

const Login = () => {
  return (
    <div className="container d-flex justify-content-center mt-5">
      <form style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <div className="mb-3">
          <label className="form-label">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            aria-describedby="username"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <Button className="rounded-pill w-100 mt-auto" variant="light">Iniciar Sesión</Button>

      </form>
    </div>
  );
};

export default Login;
