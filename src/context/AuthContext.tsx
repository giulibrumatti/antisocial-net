import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import type {
  AuthContextType,
  SigninData,
  SignupData,
  User,
} from "../types/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [errorsContext, setErrors] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  const signin = async (data: SigninData): Promise<{ success: boolean }> => {
    setErrors(null); // Limpiar errores previos
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
    } catch (error: any) {
      setErrors([error.response?.data?.message || "Error al iniciar sesión"]);
      return { success: false };
    }
  };

  const signout = (): void => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem("user");
  };

  const signup = async (data: SignupData): Promise<{ success: boolean }> => {
    setErrors(null);
    try {
      const res = await axios.get<User[]>("/users");

      const userExists = res.data.find(
        (user) =>
          user.nickName.trim().toLowerCase() ===
            data.nickName.trim().toLowerCase() ||
          user.email.trim().toLowerCase() === data.email.trim().toLowerCase()
      );

      if (userExists) {
        setErrors(["Ya existe un usuario con ese nombre o email"]);
        return { success: false };
      }

      const createRes = await axios.post<User>("/users", data);

      setUser(createRes.data);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(createRes.data));
      return { success: true };
    } catch (error: any) {
      setErrors([
        error.response?.data?.message || "Error al registrar el usuario",
      ]);
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errorsContext,
        signin,
        signout,
        signup,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
