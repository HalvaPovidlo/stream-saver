import {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import NavBar from "./components/NavBar.jsx";
import {check} from "./http/userAPI.jsx";
import Context from "./Context.jsx"
import "./App.css"
import {CircularProgress} from "@mui/material";
import {ErrorBoundary} from "react-error-boundary";
import ErrorInfoPage from "./pages/ErrorInfoPage.jsx";
import {observer} from "mobx-react-lite";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        check().then((res) => {
            user.setUser(res);
            user.setIsAuth(true)
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
