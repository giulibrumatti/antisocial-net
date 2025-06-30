import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="d-flex">
      <Navbar />
      <main className="flex-grow-1 p-4 bg-secondary-subtle">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
