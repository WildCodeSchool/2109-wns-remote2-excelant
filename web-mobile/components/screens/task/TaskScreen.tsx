import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, FlatList } from "react-native";
import { gql, useQuery } from "@apollo/client";
import Task from "./Task";

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

const TasksScreen = () => {

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

  const [allTasks, setAllTasks] = useState([]);
  const { loading, error, data } = useQuery(TASKS_QUERY, {
    pollInterval: 500,
  });
  
  useEffect(() => {
      setAllTasks(data.findAllTasks);
  }, [data]);

  // if (loading) return <Loader />
  // if (error) return <Error />

  return (
    <View style={styles.container}>
      {!loading && data && (
        <FlatList
          style={styles.list}
          data={data.findAllTasks}
          renderItem={(task) => ( <Task task={task} /> )}
          keyExtractor={(task) => task["_id"]}
        />
      )}
      {/* <Button onPress={() => null} title="Create a new task" /> */}
    </View>
  );
};

export default TasksScreen;
