import { Button, Tab, Tabs } from "react-bootstrap";
import fotoPerfil from "../../assets/fotoPerfil.png";
import portada from "../../assets/portada.jpg";
import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../context/PostContextDef";
import { useEffect } from "react";
import Post from "../../components/Post/Post"; 
import "./profile.css";

const Profile = () => {
  const { user } = useAuth();
  const { posts, loadPosts } = usePost();

  useEffect(() => {
    loadPosts();
  }, []);

  const userPosts = posts.filter((post) => post.User.id === user?.id);
  const date = user ? new Date(user.createdAt).toISOString().split("T")[0] : "";

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
          alt="Foto de perfil"
        />
      </div>

      <div className="container-fluid d-flex align-items-center justify-content-between p-2">
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
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-geo-alt mx-2"
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07a1 1 0 0 1-1.73 0c-.726-.95-1.436-2.008-1.96-3.07C6.372 7.4 6 6.708 6 6a2 2 0 1 1 4 0c0 .708-.372 1.4-.834 1.94z" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
          <p>Argentina</p>
        </div>
        <div className="d-flex flex-row align-items-start justify-content-between">
          <svg
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-calendar3 mx-2"
            viewBox="0 0 16 16"
          >
            <path d="M14 3h-1V1h-2v2H5V1H3v2H2a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a1 1 0 0 0-1-1zM2 14V5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
            <path d="M6.5 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>
          <p>Fecha de creación: {date}</p>
        </div>
      </div>
      <Tabs defaultActiveKey="Post" id="uncontrolled-tab" className="mb-3">
        <Tab eventKey="Post" title="Posts">
          {userPosts.length > 0 ? (
            userPosts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <p>No hay publicaciones para mostrar.</p>
          )}
        </Tab>
        <Tab eventKey="Comentarios" title="Comentarios">
          <p>Aún no hay comentarios.</p>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
