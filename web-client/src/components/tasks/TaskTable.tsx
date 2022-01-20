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
  Paper, Modal, Button
} from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import { tableCellClasses } from "@mui/material/TableCell";
import { gql, useQuery } from "@apollo/client";
import TaskModal from "../modal/TaskModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const TaskTable: React.FC<{ reload: number }> = ({ reload }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (id: string) => {
    setOpen(true);
  }

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
            data.findAllTasks.map(
              ( task : any) => (
                <StyledTableRow key={task._id}>
                  <TableCell component="th" scope="row">
                    {task.name}
                  </TableCell>
                  <TableCell align="right">{task.project}</TableCell>
                  <TableCell align="right">{task.status}</TableCell>
                  <TableCell align="right">{task.assigne}</TableCell>
                  <TableCell align="right">{task.dueDate}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleOpen(task._id)}>
                      <ArticleIcon style={{fill: "black"}} />
                    </Button>
                    <TaskModal
                        // id={task._id}
                        open={open}
                        name={task.name}
                        project={task.project}
                        status={task.status}
                        assigne={task.assigne}
                        dueDate={task.dueDate}
                        handleClose={handleClose}
                    />
                  </TableCell>
                </StyledTableRow>
              )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
