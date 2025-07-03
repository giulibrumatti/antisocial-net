import { createContext } from "react";
import * as auth from "../types/auth";


export const AuthContext = createContext<auth.AuthContextType | null>(null);
