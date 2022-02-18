import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';

import Header from "./components/header/Header";

export default function App() {
    return (
        <>
            <Header />
        </>
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
