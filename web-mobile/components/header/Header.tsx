import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import TaskScreen from "../screens/task/TaskScreen";

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
            component={TaskScreen}
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
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
