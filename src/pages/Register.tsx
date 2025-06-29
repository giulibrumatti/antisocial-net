import { Button } from "react-bootstrap";

const Register = () => {
  return (
    <div className="container d-flex justify-content-center mt-5">
      <form style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Registro de Usuario</h2>

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
          <label className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <Button className="rounded-pill w-100 mt-auto" variant="light">
          Registrar
        </Button>
      </form>
    </div>
  );
};

export default Register;
