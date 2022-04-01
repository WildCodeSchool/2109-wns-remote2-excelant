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
  Pagination,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useQuery } from "@apollo/client";
import GqlRequest from "../../_graphql/GqlRequest";
import { ProjectType } from "../../_types/_projectTypes";
import ProjectTableItem from "./ProjectTableItem";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ProjectTable: React.FC<{ reload: number }> = ({ reload }) => {
  const limit = 12;
  const [page, setPage] = useState<number>(1);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { loading, data, refetch } = useQuery(
    new GqlRequest("Project").getByLimitAndPage(
      "docs {_id, name, status, projectManager, dueDate}, totalPages"
    ),
    { variables: { input: { limit, page } } }
  );

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (reload > 0) {
      refetch();
    }
  }, [reload, page]);

  useEffect(() => {
    if (data?.findProjectByLimitAndPage) {
      setProjects(data.findProjectByLimitAndPage.docs);
      setTotalPages(data.findProjectByLimitAndPage.totalPages);
    }
  }, [data]);

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
            {projects &&
              projects.map((project: ProjectType) => (
                <ProjectTableItem
                  project={project}
                  refetch={refetch}
                  key={project._id}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {totalPages > 1 && (
          <Pagination count={totalPages} page={page} onChange={onPageChange} />
        )}
      </Box>
    </>
  );
};

export default ProjectTable;
