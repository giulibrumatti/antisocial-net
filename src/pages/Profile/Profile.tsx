import { Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import fotoPerfil from "../../assets/fotoPerfil.png";
import portada from "../../assets/portada.jpg";
import Post from "../../components/Post/Post";
import { useAuth } from "../../context/AuthContext";
import "./profile.css";

const Profile = () => {
  const { user } = useAuth();
  const date = new Date(user?.createdAt).toISOString().split("T")[0];
  return (
    <div className="container mx-2 border border-dark-subtle rounded-3 p-0 m-0 w-75">
      <div className="p-0 m-0 container-fluid position-relative">
        <img
          className="w-100 portadaUser"
          src={portada}
          alt="Portada del usuario"
        />
        <img
          className="foto-perfil border border-dark"
          src={fotoPerfil}
          alt=""
        />
      </div>
      <div className="container-fluid d-flex  align-items-center justify-content-between p-2">
        <div>
          <h5>{user?.nickName}</h5>
          <p className="text-secondary">{user?.email}</p>
        </div>
        <Button className="rounded-pill mx-5" variant="dark">
          Editar Perfil
        </Button>
      </div>
      <div className="container d-flex flex-row align-items-start justify-content-around px-3">
        <div className="d-flex flex-row align-items-start justify-content-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-geo-alt mx-2"
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <p>Argentina</p>
        </div>
        <div className="d-flex flex-row align-items-start justify-content-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-calendar3 mx-2"
            viewBox="0 0 16 16"
          >
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>
          <p>Fecha de creación: {date}</p>
        </div>
      </div>
      <Tabs defaultActiveKey="Post" id="uncontrolled-tab" className="mb-3" fill>
        <Tab eventKey="Post" title="Post">
          <Post></Post>
          <Post></Post>
        </Tab>
        <Tab eventKey="Respuesta" title="Respuesta">
          <Post></Post>
          <Post></Post>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
