import type { RouteItem } from "../../types/auth";

export const privateRoutes: RouteItem[] = [
  {
    name: "Inicio",
    path: "/home",
  },
  {
    name: "Mi perfil",
    path: "/profile",
  },
];

export const publicRoutes: RouteItem[] = [
  {
    name: "Inicio",
    path: "/home",
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
