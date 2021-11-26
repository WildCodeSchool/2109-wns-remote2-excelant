import { Typography, Box } from "@mui/material";
import React from "react";
import TaskTable from "../components/tasks/TaskTable";

const TasksPage: React.FC = () => (
  <Box>
    <Typography variant="h4" sx={{ textAlign: "center", mb: "16px" }}>
      TasksPage
    </Typography>
    <TaskTable />
  </Box>
);

export default TasksPage;
