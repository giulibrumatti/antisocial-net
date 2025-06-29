import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { privateRoutes, publicRoutes } from "./navegation.ts";

const nav = [
  { name: "Inicio", link: "/" },
  { name: "Perfil", link: "/profile" },
  { name: "Login", link: "/login" },
  { name: "Registrarse", link: "/register" },
];

const Navbar = () => {
  return (
    <aside
      className="bg-dark text-white p-3 d-flex flex-column"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <Link
        to="/"
        className="navbar-brand fw-bold text-white mb-4 text-decoration-none"
      >
        AntiSocial Net
      </Link>
      <NavList />
      <Button className="rounded-pill w-100 mt-auto" variant="light">
        Postear
      </Button>
    </aside>
  );
};

export default Navbar;

function NavList() {
  const location = useLocation();
  const { isAuth, signout, user } = useAuth();
  return (
    <ul className="nav flex-column gap-2">
      {isAuth ? (
        <>
          {privateRoutes.map(({ path, name }) => (
            <li
              className={`${location.pathname === path && "nav-item"}`}
              key={path}
            >
              <Link className="nav-link text-white fw-medium" to={path}>
                {name}
              </Link>
            </li>
          ))}

          <li className="nav-item">
            <Button
              onClick={() => signout()}
              className="nav-link text-white fw-medium"
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              Cerrar Sesión
            </Button>
          </li>
        </>
      ) : (
        publicRoutes.map(({ path, name }) => (
          <li
            className={`${location.pathname === path && "nav-item"}`}
            key={path}
          >
            <Link className="nav-link text-white fw-medium" to={path}>
              {name}
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}
