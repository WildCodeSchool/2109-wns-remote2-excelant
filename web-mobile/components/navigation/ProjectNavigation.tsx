import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ProjectScreen from "../screens/project/ProjectScreen";
import SingleProjectScreen from "../screens/project/SingleProjectScreen";

export type StackParams = {
  List: undefined;
  SingleProject: {
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
        <Stack.Screen name="List" component={ProjectScreen} options={options} />
        <Stack.Screen name="SingleProject" component={SingleProjectScreen} />
      </Stack.Navigator>
    </>
  );
}
