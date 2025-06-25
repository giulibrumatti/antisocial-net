import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import portada from "../../assets/portada.jpg";
import fotoPerfil from "../../assets/fotoPerfil.png";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./profile.css";
import Post from "../../components/Post/Post";
const Profile = () => {
    const [key, setKey] = useState<string>('home');
    const navigate = useNavigate();
    const user = false // se reemplaza con la peticion a useContext para sabver si el usuario esta logueado
    useEffect(() => {
        if (user)
            navigate("/login")
    }, [user, navigate])
    return (
        <div className="container mx-2 border border-dark-subtle rounded-3 p-0 m-0 w-50">
            <h4 className="p-2">NOMBRE DEL USUARIO</h4>
            <div className="p-0 m-0 container-fluid position-relative">
                <img className="w-100" src={portada} alt="Portada del usuario" />
                <img className="foto-perfil border border-dark" src={fotoPerfil} alt="" />
            </div>
            <div className="container-fluid d-flex  align-items-center justify-content-between p-2">
                <div>
                    <h5>Nombre del Usuario</h5>
                    <p className="text-secondary">@username</p>
                </div>
                <Button className="rounded-pill mx-5" variant="dark">Editar Perfil</Button>
            </div>
            <div className="container d-flex flex-row align-items-start justify-content-between px-3">
                <p>Localidad</p>
                <p>Fecha de Nacimiento</p>
                <p>Fecha de Cracion de Perfil</p>
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
