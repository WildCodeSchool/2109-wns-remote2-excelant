import { IconButton, styled, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ProjectType } from "../../_types/_projectTypes";
import DeleteProjectModal from "./DeleteProjectModal";
import moment from 'moment';

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
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <StyledTableRow>
        <TableCell component="th" scope="row">
          {project.name}
        </TableCell>
        <TableCell align="right">{project.status}</TableCell>
        <TableCell align="right">{project.projectManager}</TableCell>
        <TableCell align="right">{moment(project.dueDate).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="right">
          <IconButton color="error" onClick={() => setOpen(true)}>
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </StyledTableRow>
      <DeleteProjectModal
        project={project}
        open={open}
        handleClose={() => setOpen(false)}
        refetch={refetch}
      />
    </>
  );
};

export default ProjectTableItem;
