import React from "react";
import { Link, Outlet } from "react-router-dom";

import { makeStyles } from '@mui/styles';

import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Drawer as MUIDrawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';

import SidebarData from "./SidebarData";

const useStyles = makeStyles({
  default: {
    width: '190px'
  }
});

function NavBar(): ReactJSXElement {
  const classes = useStyles();

  const itemList = [
    {
      text: "Home",
      icon: <HomeIcon />
    },
    {
      text: "Tasks",
      icon: <TaskIcon />
    },
    {
      text: "Projects",
      icon: <AssignmentIcon />
    },
    {
      text: "Users",
      icon: <PersonIcon />
    }
  ];

  return (
    <MUIDrawer variant="permanent" sx={{width: '190px'}}>
      <List>
        {itemList.map((item, index) => {
          const { text, icon } = item;
          return (
          <ListItem button key={text}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={text} />
          </ListItem>
        )})}
      </List>
    </MUIDrawer>
);
};

export default NavBar;
