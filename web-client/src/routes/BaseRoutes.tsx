import React from "react";
import { BrowserRouter as Router, Routes, Route, Location } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TasksPage from "../pages/TasksPage";
import ProjectsPage from "../pages/ProjectsPage";
import UsersPage from "../pages/UsersPage";
import NavBar from "../components/navbar/NavBar";
import Register from "../components/form/Register";
import Login from "../components/form/Login";

const BaseRoutes: React.FC = () => (
  <>
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </Router>
  </>
);

export default BaseRoutes;
