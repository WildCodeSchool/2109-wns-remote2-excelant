import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Card, Grid, Stack} from "@mui/material";
import { modalStyle } from "../../_utils/modalStyle";
import {CardHeader} from "@mui/material";

const TaskModal: React.FC<{ open: boolean, task: any, handleClose: () => void }> = ({
    open,
    task,
    handleClose
}) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Card sx={{ ...modalStyle, padding: "8px 24px" }}>
                <Box display="flex" justifyContent="start">
                    <Typography variant="h1" sx={{ textAlign: "center" }}>
                        {task?.name}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="end">
                    <Typography variant="h2" sx={{ textAlign: "center" }}>Comments</Typography>
                </Box>

                {/*<p>{project}</p>*/}
                {/*<p>{status}</p>*/}
                {/*<p>{assigne}</p>*/}
                {/*<p>{dueDate}</p>*/}
            </Card>
        </Modal>
        );
};

export default TaskModal;
