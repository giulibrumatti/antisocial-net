import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "../api/axios";

interface User {
  nickName: string;
  email: string;
  [key: string]: any;
}

interface SigninData {
  nickName: string;
  password: string; // En este caso, el password es el email
}

interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  errorsContext: string[] | null;
  signin: (data: SigninData) => Promise<{ success: boolean }>;
  signout: () => void;
}

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

      // Usuario válido
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errorsContext,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
