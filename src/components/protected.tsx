import { Children, type ReactNode } from "react";
import { AuthContext } from "../context/userContext";
import { Navigate, useNavigate } from "react-router";



const UserProtected = ({ children }: { children: ReactNode }) => {
    const { user ,isLoading} = AuthContext();
    if (isLoading) return <p className="p-8 text-center">טוען...</p>;
    if (!user || user.role != "CUSTOMER")
        return <Navigate to={"/"} />
    return children;
}
export const AdminProtected = ({ children }: { children: ReactNode }) => {
    const { user ,isLoading} = AuthContext();
    if (isLoading) return <p className="p-8 text-center">טוען...</p>;
    if (!user || user.role != "ADMIN")
       return  <Navigate to={"/"} />
    return children;
}


export default UserProtected;  