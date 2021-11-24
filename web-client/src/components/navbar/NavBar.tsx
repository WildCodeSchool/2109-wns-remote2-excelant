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

const useStyles = makeStyles((theme: any) =>
  createStyles({
    sidebar: {
      color: "#F3F4F6",
      width: "250px",
      height: "100vh",
      backgroundColor: "rgba(125, 128, 218, .75)",
    },
  })
);

function NavBar(props: any): ReactJSXElement {
  const { history } = props;
  const classes = useStyles();

  const itemList = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/"
    },
    {
      text: "Tasks",
      icon: <TaskIcon />,
      path: "tasks"
    },
    {
      text: "Projects",
      icon: <AssignmentIcon />,
      path: "projects"
    },
    {
      text: "Users",
      icon: <PersonIcon />,
      path: "users"
    },
  ];

  return (
    <>
      <h1>ExcelAnt</h1>
      <MUIDrawer variant="permanent">
        <List className={classes.sidebar}>
          {itemList.map((item, index) => {
            const { text, icon, path } = item;
            return (
              <ListItem button key={text} component={Link} to={path}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </MUIDrawer>
    </>
  );
}

export default NavBar;
