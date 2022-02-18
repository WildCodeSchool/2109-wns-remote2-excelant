import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text, Button, View, StyleSheet, Modal, FlatList } from "react-native";
import { gql, useQuery } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  field: {},
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

const TasksScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const TASKS_QUERY = gql`
    query {
      findAllTasks {
        _id
        name
        project
        status
        assigne
        dueDate
      }
    }
  `;

  const { loading, data } = useQuery(TASKS_QUERY);

  return (
    <View style={styles.container}>
      {!loading && data && (
        <>
          <FlatList
            style={styles.list}
            data={data.findAllTasks}
            renderItem={(task) => (
              <>
                {console.log(task)}
                <View style={styles.row}>
                  <Text style={styles.label}>Name</Text>
                  <Text style={styles.field}>{task.item.name}</Text>
                </View>
                <View style={{ ...styles.row, backgroundColor: "lightgrey" }}>
                  <Text style={styles.label}>Project</Text>
                  <Text style={styles.field}>{task.item.project}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Assignee</Text>
                  <Text style={styles.field}>{task.item.assigne}</Text>
                </View>
                <View style={{ ...styles.row, backgroundColor: "lightgrey" }}>
                  <Text style={styles.label}>Status</Text>
                  <Text style={styles.field}>{task.item.status}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Due Date</Text>
                  <Text style={styles.field}>{task.item.dueDate}</Text>
                </View>
                {task.index !== data.findAllTasks.length - 1 && (
                  <Text style={{ ...styles.row, backgroundColor: "lightgrey" }}>
                    ~
                  </Text>
                )}
              </>
            )}
            keyExtractor={(task) => task["_id"]}
          />
          <Button
            onPress={() => navigation.navigate("Create", { screen: "Task" })}
            title="Create a new task"
          />
        </>
      )}
    </View>
  );
};

export default TasksScreen;
