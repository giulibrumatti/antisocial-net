import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Terminos from "./pages/Terminos";
import Privacidad from "./pages/Privacidad";
import Ayuda from "./pages/Ayuda";
import Acerca from "./pages/Acerca";
import Profile from "./pages/Profile/Profile";

import { Home } from "./pages/Home";
import {PostDetails} from "./components/PostDetails";

import Register from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";


function App() {
  const { isAuth } = useAuth();
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 p-4 bg-secondary-subtle">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />

          <Route path="/post/:id" element={<PostDetails />} />


          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/ayuda" element={<Ayuda />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirectTo="/login" isAllowed={isAuth}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
