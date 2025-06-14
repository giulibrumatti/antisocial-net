import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const nav = [
  { name: 'Inicio', link: '/' },
  { name: 'Perfil', link: '/profile' },
  { name: 'Login', link: '/login' },
  { name: 'Registrarse', link: '/register' },
];

const Navbar = () => {
  return (
    <aside
      className="bg-dark text-white p-3 d-flex flex-column"
      style={{ width: '250px', minHeight: '100vh' }}
    >
      <Link
        to="/"
        className="navbar-brand fw-bold text-white mb-4 text-decoration-none"
      >
        AntiSocial Net
      </Link>
      <NavList />
      <Button className="rounded-pill w-100 mt-auto" variant="light">Postear</Button>

    </aside>
  );
};

export default Navbar;

function NavList() {
  return (
    <ul className="nav flex-column gap-2">
      {nav.map(({ name, link }) => (
        <li className="nav-item" key={name}>
          <Link className="nav-link text-white fw-medium" to={link}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
