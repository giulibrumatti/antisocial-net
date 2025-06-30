export interface User {
  nickName: string;
  email: string;
  [key: string]: any;
}

export interface SigninData {
  nickName: string;
  password: string;
}

export interface SignupData {
  nickName: string;
  email: string;
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

export interface RouteItem {
  name: string;
  path: string;
}