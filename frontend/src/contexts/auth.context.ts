import { User } from "@/interfaces/user.interface";
import { createContext } from "react";

const AuthContext = createContext<User>({ username: null, id: null });
export default AuthContext;