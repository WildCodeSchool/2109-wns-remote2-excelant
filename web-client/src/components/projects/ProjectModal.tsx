import { Box, Card, Grid, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { ProjectType } from "../../_types/_projectTypes";
import { taskModalStyle } from "../../_utils/modalStyle";

const ProjectModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  project: ProjectType;
}> = ({ open, handleClose, project }) => {
  const [modify, setModify] = useState<boolean>(false);
  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={{ ...taskModalStyle, padding: "24px 32px" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={6}>
            <Typography
              variant="h3"
              sx={{ textAlign: "center", color: "rgba(125, 128, 218)", mb: 2 }}
            >
              {project.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias
              architecto atque commodi corporis debitis deleniti deserunt
              dolorem doloremque eaque impedit, inventore laudantium libero
              magnam maxime nisi quo tempore voluptatibus.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  display: "inline",
                  fontWeight: "bold",
                  color: "rgba(125, 128, 218)",
                  textAlign: "right",
                  width: "150px",
                }}
              >
                Status :
              </Typography>
              <Typography variant="body1" sx={{ display: "inline" }}>
                {project.status}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  display: "inline",
                  fontWeight: "bold",
                  color: "rgba(125, 128, 218)",
                  textAlign: "right",
                  width: "150px",
                }}
              >
                Project manager :
              </Typography>
              <Typography variant="body1" sx={{ display: "inline" }}>
                {project.projectManager}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  display: "inline",
                  fontWeight: "bold",
                  color: "rgba(125, 128, 218)",
                  textAlign: "right",
                  width: "150px",
                }}
              >
                Due date :
              </Typography>
              <Typography variant="body1" sx={{ display: "inline" }}>
                {project.dueDate}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h3"
              sx={{ textAlign: "center", color: "rgba(125, 128, 218)" }}
            >
              Comments
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Modal>
  );
};

export default ProjectModal;
