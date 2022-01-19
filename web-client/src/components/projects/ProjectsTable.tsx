import React, { useEffect } from "react";
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

const ProjectTable: React.FC<{ reload: number }> = ({ reload }) => {
  const PROJECTS_QUERY = gql`
    query {
      findAllProjects {
        _id
        name
        status
        projectManager
        dueDate
      }
    }
  `;

  const { loading, data, refetch } = useQuery(PROJECTS_QUERY);

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
            <StyledTableCell>Project</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Project Manager</StyledTableCell>
            <StyledTableCell align="right">Due date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.findAllProjects.map(
              ({ _id, name, status, projectManager, dueDate }: any) => (
                <StyledTableRow key={_id}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">{status}</TableCell>
                  <TableCell align="right">{projectManager}</TableCell>
                  <TableCell align="right">{dueDate}</TableCell>
                </StyledTableRow>
              )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
