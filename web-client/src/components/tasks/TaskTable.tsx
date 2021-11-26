import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

function TaskTable(): ReactJSXElement {
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

  const { loading, data } = useQuery(TASKS_QUERY);
  console.log(data);

  return (
    <TableContainer component={Paper}>
      {/* <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell align="right">Project</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Assignee</StyledTableCell>
            <StyledTableCell align="right">Due date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskList &&
            taskList.map(
              ({ id, subject, project, status, assignee, due_date }) => (
                <StyledTableRow key={id}>
                  <TableCell component="th" scope="row">
                    {subject}
                  </TableCell>
                  <TableCell align="right">{project}</TableCell>
                  <TableCell align="right">{status}</TableCell>
                  <TableCell align="right">{assignee}</TableCell>
                  <TableCell align="right">{due_date}</TableCell>
                </StyledTableRow>
              )
            )}
        </TableBody>
      </Table> */}
    </TableContainer>
  );
}

export default TaskTable;
