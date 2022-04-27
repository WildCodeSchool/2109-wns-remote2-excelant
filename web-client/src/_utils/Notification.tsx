import React, {useState} from 'react';
import { Snackbar, Alert } from '@mui/material';

const Notification: React.FC = () => {
    const [openStackbar, setOpenStackbar] = useState<boolean>(false);

    return (
        <Snackbar>
            <Alert>

            </Alert>
        </Snackbar>
    )
};

export default Notification;
