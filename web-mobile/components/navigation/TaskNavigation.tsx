import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SingleTaskScreen from "../screens/task/SingleTaskScreen";
import TasksScreen from "../screens/task/TasksScreen";

export type StackParams = {
  List: undefined;
  SingleTask: {
    id: string;
  };
};

const Stack = createStackNavigator<StackParams>();

export default function Header() {
  const options = {
    headerShown: false,
  };

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="List" component={TasksScreen} options={options} />
        <Stack.Screen name="SingleTask" component={SingleTaskScreen} />
      </Stack.Navigator>
    </>
  );
}
