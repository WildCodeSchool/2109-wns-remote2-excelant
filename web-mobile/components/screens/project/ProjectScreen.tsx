import React, { useState, useEffect } from "react";
import {StyleSheet, View, FlatList, Text} from "react-native";
import {gql, useQuery} from "@apollo/client";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    field: {},
    list: {
        margin: 16,
        borderWidth: 2
    },
    row: {
        flex: 1,
        flexDirection: "row",
        padding: 2
    },
    label: {
        width: 70
    }
});

const {container, title, field, list, row, label} = styles;

const PROJECTS_QUERY = gql`
    query {
      findAllProjects {
        _id
        name
        status
        projectManager
        dueDatefze
      }
    }
  `;

const ProjectScreen = () => {

    const {loading, data, error} = useQuery(PROJECTS_QUERY);

    if (error) return <Text>{error.message}</Text>;

    return (
        <View style={container}>
            {!loading && data && (
                <FlatList
                    style={list}
                    data={data.findAllProjects}
                    renderItem={(project) => (
                        <>
                            <View style={row}>
                                <Text style={label}>Name</Text>
                                <Text style={field}>{project.item.name}</Text>
                            </View>
                            <View style={{...row, backgroundColor: "lightgrey"}}>
                                <Text style={label}>Status</Text>
                                <Text style={field}>{project.item.status}</Text>
                            </View>
                            <View style={row}>
                                <Text style={label}>Project Manager</Text>
                                <Text style={field}>{project.item.projectManager}</Text>
                            </View>
                            <View style={{...row, backgroundColor: "lightgrey"}}>
                                <Text style={label}>Due Date</Text>
                                <Text style={field}>{project.item.dueDate}</Text>
                            </View>
                            {project.index !== data.findAllProjects.length - 1 && (
                                <View
                                    style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 0.5,
                                    }}
                                />
                            )}
                        </>
                    )}
                    keyExtractor={(project) => project["_id"]}
                />
            )}
            {/* <Button onPress={() => null} title="Create a new project" /> */}
        </View>
    );

};

export default ProjectScreen;
