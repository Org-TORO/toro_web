import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../security/auth.store";


export function ProtectedRoute() {
    const location = useLocation();


    const { isAuthenticated } = useAuthStore();


    if (!isAuthenticated) {
        return (
            <Navigate to="/login" replace state={{from: location}} />
        )
    }


    return <Outlet />;
}


export default ProtectedRoute;