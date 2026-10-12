import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protected.route";
import PrivatePage from "../../app/public/private.page";
import DemoPage from "../../app/public/demo/demo.page";
import LedgerDashboardPage from "../../app/dashboard/ledger-dashboard.page";


const routes = createBrowserRouter([
    // Public routes
    {
        path: "/",
        element: <LedgerDashboardPage></LedgerDashboardPage>,
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
