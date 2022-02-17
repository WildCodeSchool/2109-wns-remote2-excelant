import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Button} from 'react-native';

import Header from "./components/header/Header";

export default function App() {
    return (
        <>
            <Header />
        </>
        // <View style={styles.container}>
        //   <Text>Open up App.tsx to start working on your app!</Text>
        //   <StatusBar style="auto" />
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
