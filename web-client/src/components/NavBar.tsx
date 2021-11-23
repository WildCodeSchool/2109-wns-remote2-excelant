import React from "react";
import { Link, Outlet } from "react-router-dom";

const NavBar: React.FC = () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/users">Users</Link>
    </nav>
    <Outlet />
  </div>
);

export default NavBar;
