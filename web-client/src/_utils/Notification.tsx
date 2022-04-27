import React from 'react';
import {Snackbar, Alert} from '@mui/material';

const Notification: React.FC<{
    isOpen: boolean
    message: string,
    type: "success" | "info" | "warning" | "error",
    setNotify: any
}> = ({
    isOpen,
    message,
    type,
    setNotify
}) => {
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            isOpen: false
        });
    }

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={300000}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            onClose={handleClose}
        >
            <Alert
                severity={type}
                onClose={handleClose}
                sx={{fontSize: "0.75rem" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
