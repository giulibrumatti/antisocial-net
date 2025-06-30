import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Terminos from "./pages/Terminos";
import Privacidad from "./pages/Privacidad";
import Ayuda from "./pages/Ayuda";
import Acerca from "./pages/Acerca";


function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 p-4 bg-secondary-subtle">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/ayuda" element={<Ayuda />} />
          <Route path="/acerca" element={<Acerca />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
