import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-auto border-top">
      <div className="container">
        <small className="d-block mb-1">
          © {new Date().getFullYear()} AntiSocial Net
        </small>
        <div className="d-flex justify-content-center gap-3 flex-wrap small">
          <Link to="/terminos" className="text-muted text-decoration-none">
            Términos
          </Link>
          <Link to="/privacidad" className="text-muted text-decoration-none">
            Privacidad
          </Link>
          <Link to="/ayuda" className="text-muted text-decoration-none">
            Ayuda
          </Link>
          <Link to="/acerca" className="text-muted text-decoration-none">
            Acerca de
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer