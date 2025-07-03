export interface User {
  id: number;
  nickName: string;
  email: string;
}

export interface SigninData {
  nickName: string;
  password: string;
}

export interface SignupData {
  nickName: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  errorsContext: string[] | null;
  signin: (data: SigninData) => Promise<{ success: boolean }>;
  logout: () => void;
  signup: (data: SignupData) => Promise<{ success: boolean }>;
}
