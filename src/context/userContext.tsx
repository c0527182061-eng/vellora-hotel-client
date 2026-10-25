import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, UserContextType } from "../types/user";
import { getCurrentUser } from "../api/auth";


export const userContext = createContext<UserContextType | undefined>(undefined);

const Userprovider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    const login = (user: User) => setUser(user)
    const logout = () =>{localStorage.removeItem("token")
         setUser(null)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            setIsLoading(false)
            return
        }
        getCurrentUser()
            .then((u) => setUser(u))
            .catch(() => localStorage.removeItem("token")) 
            .finally(() => setIsLoading(false))
    }, [])
    return (
        <userContext.Provider value={{ user, isLoggedIn: !!user, login, logout, isLoading }}>
            {children}
        </userContext.Provider>
    );
};
export const AuthContext = () => {
    const context = useContext(userContext)
    if (!context) throw new Error("Header must be rendered inside userProvider")
    return context;
}


export default Userprovider;
