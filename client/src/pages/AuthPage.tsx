import {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Context from "../Context";
import {LOGIN_ROUTE, MAIN_PAGE_ROUTE, REGISTRATION_ROUTE} from "../utils/constants";
import {login, registration} from "../http/userAPI";
import {Button, Card, Container, FormControl, TextField} from "@mui/material";
import React from 'react';

const AuthPage = observer(() => {
    let navigate = useNavigate()
    // @ts-expect-error TS(2339): Property 'user' does not exist on type 'null'.
    let {user} = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const click = async () => {
        try {
            let currentUser;
            if (isLogin) {
                currentUser = await login(email, password)
            } else {
                currentUser = await registration(email, password)
            }

            user.setUser(currentUser);
            user.setIsAuth(true)

            navigate(MAIN_PAGE_ROUTE)

        } catch (e) {
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
            alert(e.response.data.message())
        }
    }
    return (
        <Container className={"d-flex justify-content-center align-items-center"}
                   style={{height: window.innerHeight - 56}}
        >
            <Card sx={{
                width: 500,
                backgroundColor: "transparent",
                margin: "auto",
                display: "flex",
                alignItems: "space-between",
                flexDirection: "column",
            }}>
                <h2 className={"m-auto"}>{isLogin ? "Authorization" : "Registration"}</h2>
                <FormControl>
                    <TextField required sx={{margin: "15px"}} placeholder={"Enter your email..."} value={email}
                               onChange={(e) => setEmail(e.target.value)}></TextField>
                    <TextField required sx={{margin: "15px"}} placeholder={"Enter your password..."} type={"password"}
                               value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
                    <div className={"d-flex justify-content-between mt-3 pl-3 pr-3"}>
                        {isLogin ?
                            <>
                                <div style={{
                                    margin: "15px"
                                }}>No account? {" "}
                                    <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
                                </div>
                                <Button sx={{margin: "15px"}} color={"success"} onClick={click}>Login</Button>
                            </> :
                            <>
                                <div style={{
                                    margin: "15px"
                                }}>Have account? {" "}
                                    <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
                                </div>
                                <Button sx={{margin: "10px"}} color={"success"} onClick={click}>Register</Button>
                            </>}
                    </div>
                </FormControl>
            </Card>
        </Container>
    );
})

export default AuthPage;

