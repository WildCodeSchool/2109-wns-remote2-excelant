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
    flex: 1,
    textTransform: 'uppercase',
    fontWeight: "bold",
  },
});

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
        <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={{ flex: 3}}>{item.name}</Text>
        </View>
        <View style={{ ...styles.row, backgroundColor: "lightgrey" }}>
            <Text style={styles.label}>Project</Text>
            <Text style={{ flex: 3}}>{item.project}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Assignee</Text>
            <Text style={{ flex: 3}}>{item.assigne}</Text>
        </View>
        <View style={{ ...styles.row, backgroundColor: "lightgrey" }}>
            <Text style={styles.label}>Status</Text>
            <Text style={{ flex: 3}}>{item.status}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Due Date</Text>
            <Text style={{ flex: 3}}>{item.dueDate}</Text>
        </View>
      </>
    );
};

export default Task;
