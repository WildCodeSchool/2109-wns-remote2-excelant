import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import { Link, Outlet } from "react-router-dom";

import {
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import HomeIcon from "@mui/icons-material/Home";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";

import "../../variables/_variables.scss";

const useStyles = makeStyles(() =>
  createStyles({
    sidebar: {
      width: "250px",
      height: "100vh",
      backgroundColor: "rgba(125, 128, 218, .75)",
    },
    text: {
      color: "#F3F4F6"
    }
  })
);

function NavBar(): ReactJSXElement {
  const classes = useStyles();

  const itemList = [
    {
      text: "Home",
      icon: <HomeIcon style={{color: "#F3F4F6", opacity: "0.8"}} />,
      path: "/homepage"
    },
    {
      text: "Tasks",
      icon: <TaskIcon style={{color: "#F3F4F6", opacity: "0.8"}} />,
      path: "/tasks"
    },
    {
      text: "Projects",
      icon: <AssignmentIcon style={{color: "#F3F4F6", opacity: "0.8"}} />,
      path: "/projects"
    },
    {
      text: "Users",
      icon: <PersonIcon style={{color: "#F3F4F6", opacity: "0.8"}} />,
      path: "/users"
    },
  ];

  return (
    <>
      <h1>ExcelAnt</h1>
      <MUIDrawer variant="permanent">
        <List className={classes.sidebar}>
          {itemList.map((item) => {
            const { text, icon, path } = item;
            return (
              <ListItem data-testid={text} button key={text} component={Link} to={path}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText className={classes.text} primary={text} />
              </ListItem>
            );
          })}
        </List>
      </MUIDrawer>
      <Outlet />
    </>
  );
}

export default NavBar;
