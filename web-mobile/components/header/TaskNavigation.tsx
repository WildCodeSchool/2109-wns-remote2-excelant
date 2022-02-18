import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import TaskScreen from "../screens/task/TaskScreen";
import CreateTaskScreen from "../screens/task/CreateTaskSceen";

const Stack = createStackNavigator();

export default function Header() {
  const options = {
    headerShown: false,
  };

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="List" component={TaskScreen} options={options} />
        <Stack.Screen
          name="Create"
          component={CreateTaskScreen}
          options={options}
        />
      </Stack.Navigator>
    </>
  );
}
