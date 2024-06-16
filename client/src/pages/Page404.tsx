import React, {useContext} from 'react';
import {MAIN_PAGE_ROUTE, LOGIN_ROUTE} from "../utils/constants";

import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import Context from "../Context";

const Page404 = () => {
    const navigate = useNavigate()
    const {userStore} = useContext(Context)

    return (
        <div>
            <Typography variant="h2">Page not found</Typography>
            <Typography variant="subtitle1">Sorry, we couldn’t find the page you’re looking for.</Typography>
            {
            //<Typography variant="span">Go back to</Typography>
            }
            {
                userStore.isAuth ?
                <Button onClick={()=>navigate(MAIN_PAGE_ROUTE)}>Home</Button> :
                <Button onClick={()=>navigate(LOGIN_ROUTE)}>Login</Button>
            }
        </div>
    );
};

export default Page404;