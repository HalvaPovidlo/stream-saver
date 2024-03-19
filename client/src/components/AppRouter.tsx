import {Routes, Route, Navigate} from "react-router-dom"
import {authRoutes, publicRoutes} from "../routes";
import {useContext} from "react";
import Context from "../Context";
import {observer} from "mobx-react-lite";
import React from "react";


const AppRouter = observer(() => {
    // @ts-expect-error TS(2339): Property 'user' does not exist on type 'null'.
    const {user} = useContext(Context)
    return (<>
            <div className="sigma-text test">
                Что вершит судьбу человечества в этом мире? Некое незримое существо или закон,
                подобно Длани Господней парящей над миром? По крайне мере истинно то, что человек не властен даже над
                своей волей.
            </div>
            <Routes>
                {user.isAuth && authRoutes.map(({path, Element}) =>
                    <Route path={path} element={Element} key={path}></Route>)
                }
                {
                    publicRoutes.map(({path, Element}) =>
                        <Route path={path} element={Element} key={path}></Route>)
                }
                <Route path="*"  element = {<Navigate to="/404"></Navigate>}/>

            </Routes>
        </>

    );
})

export default AppRouter;