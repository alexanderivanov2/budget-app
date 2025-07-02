import { createBrowserRouter } from "react-router-dom";
import NotExist from "./NotExist";
import { UserPage } from "../pages/User/UserPage";
import { GuestPage } from "../pages/Guest/GuestPage";

const userRoutes = [
    {
        path: "/",
        element: <UserPage />,
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