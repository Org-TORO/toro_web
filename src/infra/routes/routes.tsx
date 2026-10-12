import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../app/public/home.page";
import ProtectedRoute from "./protected.route";
import PrivatePage from "../../app/public/private.page";
import DemoPage from "../../app/public/demo/demo.page";


const routes = createBrowserRouter([
    // Public routes
    {
        path: "/",
        element: <HomePage></HomePage>,
    },
    {
        path: "/demo",
        element: <DemoPage></DemoPage>,
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
