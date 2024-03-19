
import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    MAIN_PAGE_ROUTE,
    PAGE_404_ROUTE
} from "./utils/constants";

import React from "react";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import Page404 from "./pages/Page404";



export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Element: <AdminPage/>,
    },
    {
        path: MAIN_PAGE_ROUTE,
        Element: <MainPage/>
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Element: <AuthPage/>,

    },
    {
        path: REGISTRATION_ROUTE,
        Element: <AuthPage/>,
    },
    {
        path: PAGE_404_ROUTE,
        Element: <Page404/>,
    },

]