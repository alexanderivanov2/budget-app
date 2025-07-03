import { createBrowserRouter } from "react-router-dom";
import NotExist from "./NotExist";
import { UserPage } from "../pages/User/UserPage";
import { Dashboard } from "../components/dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserPage />,
        children: [
            {
                index: true,
                element: <Dashboard />
            }
        ]
    },
    {
        path: "*",
        element: <NotExist />
    } 

])

export default router;