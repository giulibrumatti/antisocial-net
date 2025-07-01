import { Navigate, Outlet } from "react-router-dom";
import type { ProtectedRouteProps } from "../types/auth";

export const ProtectedRoute = ({
  redirectTo,
  isAllowed,
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};
