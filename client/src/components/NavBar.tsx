import {useContext} from 'react';

import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'

import {AppBar, Box, Button, Grid, Toolbar,} from "@mui/material";
import Context from "../Context.jsx";
import {LOGIN_ROUTE, MAIN_PAGE_ROUTE} from "../utils/constants.jsx";


const NavBar = observer(() => {
    const navigate = useNavigate();
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