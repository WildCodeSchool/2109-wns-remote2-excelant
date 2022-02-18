import React from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    margin: 16,
    borderWidth: 2,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 2,
  },
  label: {
    width: 70,
  },
});

const Task: React.FC<{ task: any }> = ({ task }) => { 
    return (
        <>
            <View style={styles.row}>
                <Text style={styles.label}>Name</Text>
                <Text>{task.item.name}</Text>
            </View>
            <View style={{ ...styles.row, backgroundColor: "lightgrey" }}>
                <Text style={styles.label}>Project</Text>
                <Text>{task.item.project}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Assignee</Text>
                <Text>{task.item.assigne}</Text>
            </View>
            <View style={{ ...styles.row, backgroundColor: "lightgrey" }}>
                <Text style={styles.label}>Status</Text>
                <Text>{task.item.status}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Due Date</Text>
                <Text>{task.item.dueDate}</Text>
            </View>
            <Text style={{ ...styles.row, backgroundColor: "lightgrey" }}>
                ~
            </Text>
        </>
    );
};

export default Task;
