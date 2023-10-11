
import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    MAIN_PAGE_ROUTE,
    PAGE_404_ROUTE
} from "./utils/constants.jsx";


import AuthPage from "./pages/AuthPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import Page404 from "./pages/Page404.jsx";


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