import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../app/public/home.page";
import ProtectedRoute from "./protected.route";
import PrivatePage from "../../app/public/private.page";
import LoginPage from "../../app/authentication/login/login.page";


const routes = createBrowserRouter([
    // Public routes
    {
        path: "/",
        element: <HomePage></HomePage>,
    },
    {
        path: "/login",
        element: <LoginPage></LoginPage>,
    },

    // Private routes
    {
        element: <ProtectedRoute></ProtectedRoute>,
        children: 
        [
            {
                path: "/private",
                element: <PrivatePage></PrivatePage>
            }
        ]
    }
]);


export default routes;