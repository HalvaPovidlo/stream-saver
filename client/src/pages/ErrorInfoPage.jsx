import React from 'react';
import {Typography} from "@mui/material";

const ErrorInfoPage = (props) => {
    const {error} = props;
    return (
        <div className="container">
            <Typography variant='h2'>Something went wrong:</Typography>
            <Typography variant='span'>{error?.message}</Typography>
        </div>
    );
};

export default ErrorInfoPage;