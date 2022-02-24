import React from "react";

import Modal from '@mui/material/Modal';
import {Card, Grid} from "@mui/material";
import { taskModalStyle } from "../../_utils/modalStyle";
import moment from 'moment';

import "./TaskModal.scss";

const TaskModal: React.FC<{ open: boolean, task: any, handleClose: () => void }> = ({
    open,
    task,
    handleClose
}) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Card sx={{ ...taskModalStyle, padding: "8px 24px" }}>
                <Grid container>
                    <Grid item xs={6}>
                        <div className="modal__task_header">
                            <h1 className="modal__task_first-title">{task?.name}</h1>
                            <p className="modal__task_description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias architecto atque commodi corporis debitis deleniti deserunt dolorem doloremque eaque impedit, inventore laudantium libero magnam maxime nisi quo tempore voluptatibus.</p>
                        </div>
                        <div className="modal__task_informations">
                            <p className="modal__task_informations-assigne">Assigne: </p> <span>{task?.assigne}</span> <br/>
                            <p className="modal__task_informations-project">Project: </p> <span>{task?.project}</span> <br/>
                            <p className="modal__task_informations-date">Due Date: </p> <span>{moment(task?.dueDate).format('DD/MM/YYYY')}</span> <br/>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <h2 className="modal__task_second-title">Comments</h2>
                    </Grid>
                </Grid>
            </Card>
        </Modal>
        );
};

export default TaskModal;
