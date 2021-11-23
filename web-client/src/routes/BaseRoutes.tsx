import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TasksPage from "../pages/TasksPage";
import ProjectsPage from "../pages/ProjectsPage";
import UsersPage from "../pages/UsersPage";
import NavBar from "../components/NavBar";

const BaseRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<HomePage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  </Router>
);

export default BaseRoutes;
