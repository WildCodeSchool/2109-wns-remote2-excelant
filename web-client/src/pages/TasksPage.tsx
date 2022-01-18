import { Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import TaskTable from "../components/tasks/TaskTable";

const TasksPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState<number>(0);
  const handleClose = () => {
    setOpen(false);
    setReload(reload + 1);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", mb: "16px" }}>
        TasksPage
      </Typography>
      <TaskTable reload={reload} />
      <Button onClick={() => setOpen(true)} sx={{ ml: "300px" }}>
        Create a new task
      </Button>
      <CreateTaskModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default TasksPage;
