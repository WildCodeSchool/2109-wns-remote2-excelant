import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, FlatList } from "react-native";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { stylesScreen } from "../../../styles/styleComponent";
import Project from "../project/Project";

const { container, title, list, row, loader, separator } = stylesScreen;

const ProjectScreen = () => {
  const PROJECT_QUERY = gql`
    query {
      findAllProjects {
        _id
        name
        status
        projectManager
        dueDate
      }
    }
  `;

  const [allProjects, setAllProjects] = useState([]);
  const { loading, data, error, refetch, networkStatus } = useQuery(
    PROJECT_QUERY,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (data) setAllProjects(data["findAllProjects"]);
  }, [data]);

  if (loading)
    return <ActivityIndicator style={loader} size="large" color="lavender" />;
  if (error) return <Text>Error! {error.message}</Text>;

  return (
    <View style={container}>
      <FlatList
        refreshing={networkStatus === NetworkStatus.refetch}
        onRefresh={() => refetch()}
        style={list}
        data={allProjects}
        renderItem={(project) => <Project item={project.item} />}
        keyExtractor={(project) => project["_id"]}
        ListEmptyComponent={<Text style={row}>No project to display!</Text>}
        ItemSeparatorComponent={() => <View style={separator} />}
        ListHeaderComponent={<Text style={title}>Project list</Text>}
      />
    </View>
  );
};

export default ProjectScreen;
