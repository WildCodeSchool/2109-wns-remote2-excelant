import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useMutation, useQuery } from "@apollo/client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GqlRequest from "../../_graphql/GqlRequest";
import { ProjectType } from "../../_types/_projectTypes";
import DeleteProjectModal from "./DeleteProjectModal";

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
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { loading, data, refetch } = useQuery(
    new GqlRequest("Project").get("_id, name, status, projectManager, dueDate")
  );

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
              <StyledTableCell>Project</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Project Manager</StyledTableCell>
              <StyledTableCell align="right">Due date</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.findAllProjects.map((project: ProjectType) => (
                <>
                  <StyledTableRow key={project._id}>
                    <TableCell component="th" scope="row">
                      {project.name}
                    </TableCell>
                    <TableCell align="right">{project.status}</TableCell>
                    <TableCell align="right">
                      {project.projectManager}
                    </TableCell>
                    <TableCell align="right">{project.dueDate}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => setOpenDeleteModal(true)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                  <DeleteProjectModal
                    key={`${project._id}delete`}
                    project={project}
                    open={openDeleteModal}
                    handleClose={() => setOpenDeleteModal(false)}
                    refetch={refetch}
                  />
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjectTable;
