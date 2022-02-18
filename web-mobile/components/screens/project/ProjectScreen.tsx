import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { gql, useQuery } from "@apollo/client";

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

const ProjectScreen = () => {
    const PROJECTS_QUERY = gql`
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

    const { loading, data } = useQuery(PROJECTS_QUERY);

    return (
        <View style={styles.container}>
            {!loading && data && (
                <FlatList
                    style={styles.list}
                    data={data.findAllProjects}
                    renderItem={(project) => (
                        <>
                            <View style={styles.row}>
                                <Text style={styles.label}>Name</Text>
                                <Text style={styles.field}>{project.item.name}</Text>
                            </View>
                            <View style={{ ...styles.row, backgroundColor: "lightgrey" }}>
                                <Text style={styles.label}>Status</Text>
                                <Text style={styles.field}>{project.item.status}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Project Manager</Text>
                                <Text style={styles.field}>{project.item.projectManager}</Text>
                            </View>
                            <View style={{ ...styles.row, backgroundColor: "lightgrey" }}>
                                <Text style={styles.label}>Due Date</Text>
                                <Text style={styles.field}>{project.item.dueDate}</Text>
                            </View>
                            {project.index !== data.findAllProjects.length -1 && (
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
