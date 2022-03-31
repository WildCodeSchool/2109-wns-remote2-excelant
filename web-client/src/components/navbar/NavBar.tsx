import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import { Link, Outlet } from "react-router-dom";

import {
  Box,
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import "../../variables/_variables.scss";

const Sidebar = styled(List)(({ theme }: any) => ({
  width: "250px",
  height: "100vh",
  backgroundColor: theme.palette.primary.main,
}));

const WhiteItemText = styled(ListItemText)(({ theme }: any) => ({
  color: theme.palette.primary.contrastText,
}));

const IconBox = styled(Box)(({ theme }: any) => ({
  color: theme.palette.primary.contrastText,
  display: "flex",
  alignItems: "center",
}));

function NavBar(): ReactJSXElement {
  const itemList = [
    {
      text: "Home",
      icon: (
        <IconBox>
          <HomeIcon style={{ opacity: "0.8" }} />
        </IconBox>
      ),
      path: "/",
    },
    {
      text: "Tasks",
      icon: (
        <IconBox>
          <TaskIcon style={{ opacity: "0.8" }} />
        </IconBox>
      ),
      path: "/tasks",
    },
    {
      text: "Projects",
      icon: (
        <IconBox>
          <AssignmentIcon style={{ opacity: "0.8" }} />
        </IconBox>
      ),
      path: "/projects",
    },
    {
      text: "Users",
      icon: (
        <IconBox>
          <PersonIcon style={{ opacity: "0.8" }} />
        </IconBox>
      ),
      path: "/users",
    },
  ];

  return (
    <>
      <Typography variant="h1">ExcelAnt</Typography>
      <MUIDrawer variant="permanent">
        <Sidebar>
          {itemList.map((item) => {
            const { text, icon, path } = item;
            return (
              <ListItem
                data-testid={text}
                button
                key={text}
                component={Link}
                to={path}
              >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <WhiteItemText primary={text} />
              </ListItem>
            );
          })}
        </Sidebar>
      </MUIDrawer>
      <Box sx={{ ml: "250px" }}>
        <Outlet />
      </Box>
    </>
  );
}

export default NavBar;
