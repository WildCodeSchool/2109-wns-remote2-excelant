import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { tableCellClasses } from "@mui/material/TableCell";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import TaskModal from "./TaskModal";
import { TaskType } from "../../_types/_taskTypes";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TaskTable: React.FC<{ reload: number }> = ({ reload }) => {
  // Define display modal to false
  const [open, setOpen] = useState(false);
  // Select specific ticket
  const [openedTask, setOpenedTask] = useState<TaskType | null>(null);

  // Close modal
  const handleClose = () => setOpen(false);
  // Open modal associated with the corresponding ticket
  const handleOpen = (task: TaskType) => {
    setOpenedTask(task);
    setOpen(true);
  };

  const TASKS_QUERY = gql`
    query {
      findAllTasks {
        _id
        name
        project
        status
        assigne
        dueDate
      }
    }
  `;

  const { loading, data, refetch } = useQuery(TASKS_QUERY);

  useEffect(() => {
    if (reload > 0) {
      refetch();
    }
  }, [reload]);

  return loading ? (
    <Box>Loading ... </Box>
  ) : (
    <>
      <TableContainer component={Paper} sx={{ pl: "250px", width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell align="right">Project</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Assignee</StyledTableCell>
              <StyledTableCell align="right">Due date</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.findAllTasks.map((task: TaskType) => (
                <StyledTableRow key={task._id}>
                  <TableCell component="th" scope="row">
                    {task.name}
                  </TableCell>
                  <TableCell align="right">{task.project}</TableCell>
                  <TableCell align="right">{task.status}</TableCell>
                  <TableCell align="right">{task.assigne}</TableCell>
                  <TableCell align="right">
                    {moment(task.dueDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleOpen(task)}>
                      <ArticleIcon style={{ fill: "black" }} />
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openedTask && (
        <TaskModal open={open} task={openedTask} handleClose={handleClose} />
      )}
    </>
  );
};

export default TaskTable;
