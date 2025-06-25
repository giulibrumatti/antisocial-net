import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import portada from "../../assets/portada.jpg";
import fotoPerfil from "../../assets/fotoPerfil.png";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./profile.css";
import Post from "../../components/Post/Post";
const Profile = () => {
    const navigate = useNavigate();
    const user = false // se reemplaza con la peticion a useContext para sabver si el usuario esta logueado
    useEffect(() => {
        if (user)
            navigate("/login")
    }, [user, navigate])
    return (
        <div className="container mx-2 border border-dark-subtle rounded-3 p-0 m-0 w-75">
            <h4 className="p-2">NOMBRE DEL USUARIO</h4>
            <div className="p-0 m-0 container-fluid position-relative">
                <img className="w-100 portadaUser" src={portada} alt="Portada del usuario" />
                <img className="foto-perfil border border-dark" src={fotoPerfil} alt="" />
            </div>
            <div className="container-fluid d-flex  align-items-center justify-content-between p-2">
                <div>
                    <h5>Nombre del Usuario</h5>
                    <p className="text-secondary">@username</p>
                </div>
                <Button className="rounded-pill mx-5" variant="dark">Editar Perfil</Button>
            </div>
            <div className="container d-flex flex-row align-items-start justify-content-around px-3">
                <div className="d-flex flex-row align-items-start justify-content-between">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-geo-alt mx-2" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    <p>Localidad</p>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-balloon mx-2" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 9.984C10.403 9.506 12 7.48 12 5a4 4 0 0 0-8 0c0 2.48 1.597 4.506 4 4.984M13 5c0 2.837-1.789 5.227-4.52 5.901l.244.487a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.244-.487C4.789 10.227 3 7.837 3 5a5 5 0 0 1 10 0m-6.938-.495a2 2 0 0 1 1.443-1.443C7.773 2.994 8 2.776 8 2.5s-.226-.504-.498-.459a3 3 0 0 0-2.46 2.461c-.046.272.182.498.458.498s.494-.227.562-.495" />
                    </svg>
                    <p>Fecha de Nacimiento</p>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar3 mx-2" viewBox="0 0 16 16">
                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                    <p>Fecha de Cracion de Perfil</p>
                </div>
            </div>
            <div className="container-fluid d-flex flex-row align-items-start justify-content-around w-50 m-0">
                <p><span>0</span> Seguidores</p>
                <p><span>0</span> Siguiendo</p>
            </div>
            <Tabs
                defaultActiveKey="Post"
                id="uncontrolled-tab"
                className="mb-3"
                fill
            >
                <Tab eventKey="Post" title="Post">
                    <Post></Post>
                    <Post></Post>
                </Tab>
                <Tab eventKey="Respuesta" title="Respuesta">
                    <Post></Post>
                    <Post></Post>
                </Tab>
                <Tab eventKey="Destacado" title="Destacado" >
                    <Post></Post>
                    <Post></Post>
                </Tab>
            </Tabs>
        </div >
    );
}

export default Profile;
