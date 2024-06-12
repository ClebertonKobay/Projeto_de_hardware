import { createContext, useState } from "react";
import { SIMPLES } from "./constants/keyboard_types";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Configs from "./screens/configs";
import Login from "./screens/login";
import Register from "./screens/register";
import Edit from "./screens/Profile";
import KeyboardProvider from "./Context/keyboardContext";
import UserProvider from "./Context/userContext";
import { CalibrationScreen } from "./screens/calibration";



export default function Middleware() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        {
            path: '/config',
            element: <Configs />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/edit',
            element: <Edit />
        },
        {
            path: "/calibration",
            element: <CalibrationScreen />
        }
    ]);

    return (
        <KeyboardProvider>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </KeyboardProvider>


    )
}