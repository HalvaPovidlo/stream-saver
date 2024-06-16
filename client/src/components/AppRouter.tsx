import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {useContext} from "react";
import Context from "../Context";
import {observer} from "mobx-react-lite";
import React from "react"

const AppRouter = observer(() => {
    const context = useContext(Context);
    const userStore = context.userStore;

    return (
        <>
            <Routes>
                {userStore.isAuth &&
                    authRoutes.map(({path, Element}) => (
                        <Route path={path} element={Element} key={path}></Route>
                    ))}
                {publicRoutes.map(({path, Element}) => (
                    <Route path={path} element={Element} key={path}></Route>
                ))}
                <Route path="*" element={<Navigate to="/404"></Navigate>}/>
            </Routes>
        </>
    );
});

export default AppRouter;
