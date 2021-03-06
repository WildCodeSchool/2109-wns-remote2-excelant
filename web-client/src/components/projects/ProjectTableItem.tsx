import { IconButton, styled, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArticleIcon from "@mui/icons-material/Article";
import moment from "moment";
import { ProjectType } from "../../_types/_projectTypes";
import DeleteProjectModal from "./DeleteProjectModal";
import ProjectModal from "./ProjectModal";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProjectTableItem: React.FC<{
  project: ProjectType;
  refetch: () => void;
}> = ({ project, refetch }) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <StyledTableRow>
        <TableCell data-testid="name" component="th" scope="row">
          {project.name}
        </TableCell>
        <TableCell data-testid="status" align="right">{project.status}</TableCell>
        <TableCell data-testid="projectManager" align="right">{project.projectManager}</TableCell>
        <TableCell data-testid="dueDate" align="right">
          {moment(project.dueDate).format("DD/MM/YYYY")}
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
      <DeleteProjectModal
        project={project}
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        refetch={refetch}
      />
      <ProjectModal
        open={open}
        handleClose={() => setOpen(false)}
        project={project}
        refetch={refetch}
      />
    </>
  );
};

export default ProjectTableItem;
