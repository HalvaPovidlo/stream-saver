import React, {useContext} from 'react';
import {MAIN_PAGE_ROUTE, LOGIN_ROUTE} from "../utils/constants.jsx";

import {Link, useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import Context from "../Context.jsx";

const Page404 = () => {
    let navigate = useNavigate()
    const {user} = useContext(Context)
    return (
        <div>
            <Typography variant="h2">Page not found</Typography>
            <Typography variant="subtitle1">Sorry, we couldn’t find the page you’re looking for.</Typography>
            <Typography variant="span">Go back to</Typography>
            {
                user.isAuth ?
                <Button onClick={()=>navigate(MAIN_PAGE_ROUTE)}>Home</Button> :
                <Button onClick={()=>navigate(LOGIN_ROUTE)}>Login</Button>
            }
        </div>
    );
};

export default Page404;