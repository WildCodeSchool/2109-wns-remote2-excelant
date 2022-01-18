import { Typography, Button, Container } from "@mui/material";
import React, { useState } from "react";
// import CreateTaskModal from "../components/tasks/CreateTaskModal";
import ProjectTable from "../components/tasks/TaskTable";

const ProjectsTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState<number>(0);
  const handleClose = () => {
    setOpen(false);
    setReload(reload + 1);
  };

  return (
   <Container maxWidth="lg">
      <Typography variant="h4" sx={{ textAlign: "center", mb: "16px" }}>
        Project Page
      </Typography>
      <ProjectTable reload={reload} />
      <Button onClick={() => setOpen(true)} sx={{ ml: "300px" }}>
        Create a new project
      </Button>
      {/* <CreateTaskModal open={open} handleClose={handleClose} /> */}
   </Container>
  );
};

export default ProjectsTable;