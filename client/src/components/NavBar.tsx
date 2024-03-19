import {useContext} from 'react';

import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'

import {AppBar, Box, Button, Grid, Toolbar,} from "@mui/material";
// @ts-expect-error TS(6142): Module '../Context.jsx' was resolved to 'C:/git/st... Remove this comment to see the full error message
import Context from "../Context.tsx";
// @ts-expect-error TS(6142): Module '../utils/constants.jsx' was resolved to 'C... Remove this comment to see the full error message
import {LOGIN_ROUTE, MAIN_PAGE_ROUTE} from "../utils/constants.tsx";
import React from 'react';


const NavBar = observer(() => {
    const navigate = useNavigate();
    // @ts-expect-error TS(2339): Property 'user' does not exist on type 'null'.
    const {user} = useContext(Context)

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token', '')
    }

    return (
        <Box sx={{flexGrow: 1}} className="navbar">
            <AppBar position="static" >
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            {user.isAuth ? <Button sx={{
                                color:"white",
                                fontSize:14,

                            }} onClick={() => {
                                navigate(MAIN_PAGE_ROUTE)
                            }}>Records</Button> : <div></div>}
                        </Grid>
                        <Grid item>
                            <a>Stream saver</a>
                        </Grid>
                        {
                            user.isAuth ?
                                <Grid item>
                                    <div className={"user-email"}>{user.user.email}</div>
                                    <Button sx={{float: "right"}} onClick={() => {
                                        logout()
                                        navigate(LOGIN_ROUTE)
                                    }}>Logout</Button>
                                </Grid> :
                                <Grid item>
                                    <Button sx={{float: "right"}} onClick={() => {
                                        navigate(LOGIN_ROUTE)
                                    }} color="inherit">Login</Button>
                                </Grid>
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    )
})

export default NavBar;