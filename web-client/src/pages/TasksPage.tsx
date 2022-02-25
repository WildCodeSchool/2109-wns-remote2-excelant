import { Typography, Button, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import CreateTaskModal from "../components/tasks/CreateTaskModal";
import TaskTable from "../components/tasks/TaskTable";
import GqlRequest from "../_graphql/GqlRequest";


const TasksPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState<number>(0);
  const handleClose = () => {
    setOpen(false);
    setReload(reload + 1);
  };
  const [projects, setProjects] = useState([]);
  
  const { data } = useQuery(
    new GqlRequest("Project").get("_id, name")
    );

  useEffect(() => {
    if (data) setProjects(data.findAllProjects);
  }, [data]);

  return (
   <Container maxWidth="lg">
      <Typography variant="h4" sx={{ textAlign: "center", mb: "16px" }}>
        TasksPage
      </Typography>
      <TaskTable reload={reload} />
      <Button onClick={() => setOpen(true)} sx={{ ml: "300px" }}>
        Create a new task
      </Button>
      <CreateTaskModal open={open} handleClose={handleClose} projects={projects} />
   </Container>
  );
};

export default TasksPage;
