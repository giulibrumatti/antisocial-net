// Importamos el tipo User desde su archivo
import type { User } from "./User";

// Datos para iniciar sesión
export interface SigninData {
  nickName: string;
  password: string;
}

// Datos para registrarse
export interface SignupData {
  nickName: string;
  email: string;
  password: string;
}

// Contexto de autenticación
export interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  errorsContext: string[] | null;
  signin: (data: SigninData) => Promise<{ success: boolean }>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}
