import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAccessToken } from "../security/jwt.helper";


export function ProtectedRoute() {
    const location = useLocation();


    const isAuthenticated = getAccessToken() !== null ? true : false;


    if (!isAuthenticated) {
        return (
            <Navigate to="/login" replace state={{from: location}} />
        )
    }


    return <Outlet />;
}


export default ProtectedRoute;