import React, {useState} from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Card} from "@mui/material";
import { modalStyle } from "../../_utils/modalStyle";
import {CardHeader} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TaskModal: React.FC<{
    // id: string,
    open: boolean,
    name: string,
    project: string,
    status: string,
    assigne: string,
    dueDate: string,
    handleClose: (id: string) => void
    }> = ({
    // id,
    open,
    name,
    project,
    status,
    assigne,
    dueDate,
    handleClose
}) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Card sx={{ ...modalStyle }}>
                <CardHeader />
                <h1 className="">{name}</h1>
                <p>{project}</p>
                <p>{status}</p>
                <p>{assigne}</p>
                <p>{dueDate}</p>
            </Card>
        </Modal>
        );
};

export default TaskModal;
