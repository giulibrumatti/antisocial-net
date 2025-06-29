import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuth } = useAuth();
  return (
    <div className="d-flex">
      <Navbar />
      <main className="flex-grow-1 p-4 bg-secondary-subtle">
        <Routes>
          <Route path="/login" element={<Login />} />
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
    </div>
  );
}

export default App;
