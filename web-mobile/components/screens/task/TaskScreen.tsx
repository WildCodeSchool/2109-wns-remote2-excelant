import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import Task from "./Task";
import { stylesScreen } from '../../../styles/styleComponent';

const { container, title, list, row, loader, separator } = stylesScreen;

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

  if (loading) return <ActivityIndicator style={loader} size="large" color="lavender"/>;
  if (error) return <Text>Error! {error.message}</Text>;

  return (
    <View style={container}>
      <FlatList
        refreshing={(networkStatus === NetworkStatus.refetch)}
        onRefresh={() => refetch()}
        style={list}
        data={allTasks}
        renderItem={(task) => <Task item={task.item}/>}
        keyExtractor={(task) => task["_id"]}
        ListEmptyComponent={<Text style={row}>Il n'y a pas de tâches a afficher !</Text>}
        ItemSeparatorComponent={ () => <View style={separator} /> }
        ListHeaderComponent={<Text style={title}>Task list</Text>}
      />
    </View>
  );
};            

export default TasksScreen;
