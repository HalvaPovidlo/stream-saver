import React from 'react';
import {Typography} from "@mui/material";

interface IErrorInfoPageProps {
    error: Error
}

const ErrorInfoPage = (props: IErrorInfoPageProps) => {
    const {error} = props;
    return (
        <div className="container">
            <Typography variant='h2'>Something went wrong:</Typography>
            <Typography variant = 'body1'>{error.message}</Typography>
        </div>
    );
};

export default ErrorInfoPage;