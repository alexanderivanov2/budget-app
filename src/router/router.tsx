import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import NotExist from "./NotExist";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    }, 
    {
        path: "*",
        element: <NotExist />
    } 

])

export default router;