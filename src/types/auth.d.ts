import type { ReactNode } from "react";

export interface User {
  id?: number; // Agregado id, ya que el backend lo suele generar
  nickName: string;
  email: string;
  password?: string; // Agregado password para la verificación (idealmente, esto sería un hash en el backend)
  [key: string]: any;
}

export interface SigninData {
  nickName: string;
  password: string;
}

export interface SignupData {
  nickName: string;
  email: string;
  password: string; // 👉 Agregado password para el registro
}

export interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  errorsContext: string[] | null;
  signin: (data: SigninData) => Promise<{ success: boolean }>;
  signup: (data: SignupData) => Promise<{ success: boolean }>;
  signout: () => void;
}

export interface ProtectedRouteProps {
  redirectTo: string;
  isAllowed: boolean;
  children?: ReactNode;
}

export interface RouteItem {
  name: string;
  path: string;
}
