import React from "react";
import { View, Text } from "react-native";
import { stylesData } from "../../styles/styleComponent";

const { row, label } = stylesData;

export interface ProjectType {
  _id: string;
  name: string;
  status: string;
  projectManager: string;
  dueDate: string;
}

const Project: React.FC<{ item: ProjectType }> = ({ item }) => {
  return (
    <>
      <View style={row}>
        <Text style={label}>Name</Text>
        <Text style={{ flex: 3 }}>{item.name}</Text>
      </View>
      <View style={{ ...row, backgroundColor: "lightgrey" }}>
        <Text style={label}>Status</Text>
        <Text style={{ flex: 3 }}>{item.status}</Text>
      </View>
      <View style={row}>
        <Text style={label}>Project Manager</Text>
        <Text style={{ flex: 3 }}>{item.projectManager}</Text>
      </View>
      <View style={{ ...row, backgroundColor: "lightgrey" }}>
        <Text style={label}>Due Date</Text>
        <Text style={{ flex: 3 }}>{item.dueDate}</Text>
      </View>
    </>
  );
};

export default Project;
