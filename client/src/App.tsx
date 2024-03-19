import {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter";

import NavBar from "./components/NavBar";
import {check} from "./http/userAPI";
import Context from "./Context"
import "./App.css"
import {CircularProgress} from "@mui/material";
import {ErrorBoundary} from "react-error-boundary";
import ErrorInfoPage from "./pages/ErrorInfoPage";
import {observer} from "mobx-react-lite";
import React from 'react';

const App = observer(() => {
    // @ts-expect-error TS(2339): Property 'user' does not exist on type 'null'.
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        check().then((res) => {
            user.setUser(res);
            user.setIsAuth(true)
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
            localStorage.setItem("userId", res.id)
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            setLoading(false)
        })

    }, [])

    if (loading) {
        return <CircularProgress/>
    }
    return (
        <div className={"App"}>
            <ErrorBoundary fallbackRender={ErrorInfoPage}>
                <BrowserRouter>
                    <NavBar></NavBar>
                    <AppRouter></AppRouter>
                </BrowserRouter>
            </ErrorBoundary>
        </div>
    )
})

export default App
