import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import type {
  AuthContextType,
  SigninData,
  SignupData,
  User,
} from "../types/auth";

// Creamos el contexto
export const AuthContext = createContext<AuthContextType | null>(null);

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Tipo para las props del Provider
interface AuthProviderProps {
  children: ReactNode;
}

// Componente que provee el contexto
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);         // Usuario actual
  const [isAuth, setIsAuth] = useState<boolean>(false);        // Autenticado
  const [errorsContext, setErrors] = useState<string[] | null>(null); // Errores
  const [loading, setLoading] = useState<boolean>(true);       // Cargando app

  // Al iniciar, vemos si hay un user guardado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const signin = async (data: SigninData): Promise<{ success: boolean }> => {
    setErrors(null);
    try {
      const res = await axios.get<User[]>("/users");
      const userFound = res.data.find(
        (user) => user.nickName === data.nickName
      );

      if (!userFound) {
        setErrors(["Este usuario no está registrado"]);
        return { success: false };
      }

      if (data.password !== "123456") {
        setErrors(["Contraseña incorrecta"]);
        return { success: false };
      }

      setUser(userFound);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(userFound));
      return { success: true };
    } catch (error) {
      setErrors(["Error al iniciar sesión"]);
      return { success: false };
    }
  };

  // Función para registrar un usuario nuevo
  const signup = async (data: SignupData): Promise<void> => {
    setErrors(null);
    try {
      await axios.post("/users", data);
    } catch (error) {
      setErrors(["Error al registrarse"]);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem("user");
  };

  // Valores que se comparten en todo el proyecto
  return (
    <AuthContext.Provider
      value={{ user, isAuth, signin, signup, logout, errorsContext, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
