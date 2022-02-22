import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        padding: 2
    },
    label: {
        flex: 1,
        textTransform: "uppercase",
        fontWeight: "bold"
    }
});

const { row, label } = styles;

interface Project {
    name: string;
    status: string;
    projectManager: string;
    dueDate: string;
}

const Project: React.FC<{ item: Project }> = ({item}) => {
    return (
        <>
            <View style={row}>
                <Text style={label}>Name</Text>
                <Text style={{ flex: 3 }}>{item.name}</Text>
            </View>
            <View style={{ ...row, backgroundColor: "lightgrey" }}>
                <Text style={label}>Status</Text>
                <Text style={{ flex: 3 }}>{item.status}</Text>
            </View>
            <View style={row}>
                <Text style={label}>Project Manager</Text>
                <Text style={{ flex: 3 }}>{item.projectManager}</Text>
            </View>
            <View style={row}>
                <Text style={label}>Project Manager</Text>
                <Text style={{ flex: 3 }}>{item.projectManager}</Text>
            </View>
            <View style={row}>
                <Text style={label}>Due Date</Text>
                <Text style={{ flex: 3 }}>{item.dueDate}</Text>
            </View>
        </>
    )
}


