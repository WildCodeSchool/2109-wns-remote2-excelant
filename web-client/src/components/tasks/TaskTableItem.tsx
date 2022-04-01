import { IconButton, styled, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArticleIcon from "@mui/icons-material/Article";
import moment from "moment";
import { TaskType } from "../../_types/_taskTypes";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskModal from "./TaskModal";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TaskTableItem: React.FC<{
  task: TaskType;
  refetch: () => void;
}> = ({ task, refetch }) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <StyledTableRow key={task._id}>
          <TableCell component="th" scope="row">
            {task.name}
          </TableCell>
          <TableCell data-testid="name" align="right">{task.project.name}</TableCell>
          <TableCell data-testid="status" align="right">{task.status}</TableCell>
          <TableCell data-testid="assigne" align="right">{task.assigne}</TableCell>
          <TableCell data-testid="dueDate" align="right">
            {moment(task.dueDate).format("DD/MM/YYYY")}
          </TableCell>
          <TableCell align="right">
            <IconButton color="primary" onClick={() => setOpen(true)}>
              <ArticleIcon />
            </IconButton>
            <IconButton color="error" onClick={() => setOpenDelete(true)}>
              <DeleteForeverIcon />
            </IconButton>
          </TableCell>
      </StyledTableRow>

      <DeleteTaskModal
        task={task}
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        refetch={refetch}
      />
      <TaskModal
        open={open}
        handleClose={() => setOpen(false)}
        task={task}
        refetch={refetch}
      />
    </>
  );
};

export default TaskTableItem;
