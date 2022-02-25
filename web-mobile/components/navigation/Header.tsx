import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import TaskNavigation from "./TaskNavigation";
import ProjectNavigation from "./ProjectNavigation";

const Drawer = createDrawerNavigator();

export default function Header() {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Home",
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={"home"}
                  size={size}
                  color={focused ? "#0079F8" : "#ccc"}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Tasks"
            component={TaskNavigation}
            options={{
              title: "Tasks",
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={"folder"}
                  size={size}
                  color={focused ? "#0079F8" : "#ccc"}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Projects"
            component={ProjectNavigation}
            options={{
              title: "Projects",
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name={"document"}
                  size={size}
                  color={focused ? "#0079F8" : "#ccc"}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
