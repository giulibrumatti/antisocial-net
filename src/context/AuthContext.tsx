import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "../api/axios";
import type {
  SigninData,
  AuthContextType,
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuth(true);
    }
  }, []);

  const signin = async (data: SigninData): Promise<{ success: boolean }> => {
    try {
      const res = await axios.get<User[]>("/users"); // ← Trae todos los usuarios
      console.log(res.data);
      const userFound = res.data.find(
        (user) => user.nickName === data.nickName
      );

      console.log(userFound);

      if (!userFound) {
        setErrors(["Usuario no encontrado"]);
        return { success: false };
      }

      if (userFound.email !== data.password) {
        setErrors(["Contraseña incorrecta"]);
        return { success: false };
      }

      setUser(userFound);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(userFound));
      return { success: true };
    } catch (error: any) {
      setErrors([error.response?.data?.message || "Usuario no encontrado"]);
      return { success: false };
    }
  };

  const signout = (): void => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem("user");
  };

  const signup = async (data: {
    nickName: string;
    email: string;
  }): Promise<{ success: boolean }> => {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
