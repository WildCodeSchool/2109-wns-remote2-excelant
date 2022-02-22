import React from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 2,
  },
  label: {
    flex: 1,
    textTransform: 'uppercase',
    fontWeight: "bold",
  },
});
const {row, label} = styles;

interface Task {
  name: string;
  project: string;
  assigne: string;
  status: string;
  dueDate: string;
}

const Task: React.FC<{ item: Task }> = ({item}) => { 
    return (
      <>
        <View style={row}>
            <Text style={label}>Name</Text>
            <Text style={{ flex: 3}}>{item.name}</Text>
        </View>
        <View style={{ ...row, backgroundColor: "lightgrey" }}>
            <Text style={label}>Project</Text>
            <Text style={{ flex: 3}}>{item.project}</Text>
        </View>
        <View style={row}>
            <Text style={label}>Assignee</Text>
            <Text style={{ flex: 3}}>{item.assigne}</Text>
        </View>
        <View style={{ ...row, backgroundColor: "lightgrey" }}>
            <Text style={label}>Status</Text>
            <Text style={{ flex: 3}}>{item.status}</Text>
        </View>
        <View style={row}>
            <Text style={label}>Due Date</Text>
            <Text style={{ flex: 3}}>{item.dueDate}</Text>
        </View>
      </>
    );
};

export default Task;
