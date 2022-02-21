import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from "react-native";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import Task from "./Task";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    marginVertical: 4,
    width: "100%",
    borderBottomWidth: 2,
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
  loader: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  separator: {
    height: 20,
    width: "100%",
    backgroundColor: "#000",
  }
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
  const { loading, data, error, refetch, networkStatus } = useQuery(TASKS_QUERY,
      {
        notifyOnNetworkStatusChange: true,
      },
    );
  
  useEffect(() => {
    if (data) setAllTasks(data['findAllTasks']);
  });

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="lavender"/>;
  if (error) return <Text>Error! {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={(networkStatus === NetworkStatus.refetch)}
        onRefresh={() => refetch()}
        style={styles.list}
        data={allTasks}
        renderItem={(task) => <Task item={task.item}/>}
        keyExtractor={(task) => task["_id"]}
        ListEmptyComponent={<Text style={styles.row}>Il n'y a pas de tâches a afficher !</Text>}
        ItemSeparatorComponent={ () => <View style={styles.separator} /> }
        ListHeaderComponent={<Text style={styles.title}>Task list</Text>}
      />
    </View>
  );
};            

export default TasksScreen;
