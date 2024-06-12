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
    ]);

    return (
        <KeyboardProvider>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </KeyboardProvider>


    )
}