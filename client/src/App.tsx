import {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter";

import NavBar from "./components/NavBar";
import {check} from "./http/userAPI";
import Context from "./Context";
import "./App.css";
import {CircularProgress} from "@mui/material";
import {ErrorBoundary} from "react-error-boundary";
import ErrorInfoPage from "./pages/ErrorInfoPage";
import {observer} from "mobx-react-lite";
import React from "react";
import {UserSchema} from "./store/UserStore";

const App = observer(() => {
    const context = useContext(Context);
    const {userStore} = context;
    const [loading, setLoading] = useState(true);

    useEffect(() => {// тут возможно нужно не проверять если у нас путь публичный видимо надо перенести логику
        check()
            .then((res) => {
                    UserSchema.parse(res)
                    userStore.setUser(res);
                    if (res.id != undefined) {
                        localStorage.setItem("userId", res.id.toString());
                    }
                }
            ).catch((e) => {
            if (e.response.status === 401) console.log('autt err')
        })
            .finally(() => {
                setLoading(false);
            });
    }, [userStore]);

    if (loading) {
        return <CircularProgress/>;
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
    );
});

export default App;
