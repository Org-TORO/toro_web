import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../app/public/home.page";
import ProtectedRoute from "./protected.route";
import PrivatePage from "../../app/public/private.page";


const routes = createBrowserRouter([
    // Public routes
    {
        path: "/",
        element: <HomePage></HomePage>,
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