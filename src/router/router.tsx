import { createBrowserRouter } from "react-router-dom";
import NotExist from "./NotExist";
import { UserPage } from "../pages/User/UserPage";
import { GuestPage } from "../pages/Guest/GuestPage";
import { Dashboard } from "../components/dashboard/Dashboard";

const userRoutes = [
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
]

const guestRoutes = [
    {
        path: "/",
        element: <GuestPage />,
    }
]
const routes = true ? userRoutes : guestRoutes

const router = createBrowserRouter([
    ...routes,
    {
        path: "*",
        element: <NotExist />
    } 

])

export default router;