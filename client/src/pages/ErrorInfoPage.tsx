import React from 'react';
import {Typography} from "@mui/material";

const ErrorInfoPage = (props: any) => {
    const {error} = props;
    return (
        <div className="container">
            <Typography variant='h2'>Something went wrong:</Typography>
            //  @ts-expect-error
            <Typography variant = 'body1'>{error?.message}</Typography>
        </div>
    );
};

export default ErrorInfoPage;