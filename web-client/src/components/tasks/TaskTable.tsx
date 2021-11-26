import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
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
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { gql, useQuery } from "@apollo/client";

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
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.findAllTasks.map(
              ({ _id, name, project, status, assigne, dueDate }: any) => (
                <StyledTableRow key={_id}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">{project}</TableCell>
                  <TableCell align="right">{status}</TableCell>
                  <TableCell align="right">{assigne}</TableCell>
                  <TableCell align="right">{dueDate}</TableCell>
                </StyledTableRow>
              )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskTable;
