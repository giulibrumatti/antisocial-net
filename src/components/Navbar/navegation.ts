import type { RouteItem } from "../../types/auth";

export const privateRoutes: RouteItem[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Mi perfil",
    path: "/profile",
  },
];

export const publicRoutes: RouteItem[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Registrarse",
    path: "/register",
  },
];
