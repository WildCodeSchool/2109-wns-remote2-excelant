import { Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import TaskTable from "../components/tasks/TaskTable";

const TasksPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", mb: "16px" }}>
        TasksPage
      </Typography>
      <TaskTable />
      <Button onClick={() => setOpen(true)} sx={{ ml: "300px" }}>
        Create a new task
      </Button>
      <CreateTaskModal open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

export default TasksPage;
