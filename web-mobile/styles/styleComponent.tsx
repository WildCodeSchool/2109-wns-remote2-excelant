import React from 'react';
import { StyleSheet } from 'react-native';

export const stylesData = StyleSheet.create({
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

export const stylesScreen = StyleSheet.create({
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

