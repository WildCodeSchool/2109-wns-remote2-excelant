import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import HomePage from '../pages/HomePage';
import TaskPage from '../pages/TaskPage';

const Drawer = createDrawerNavigator();

export default function Header() {
    return (
        <>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen
                        name="Home"
                        component={HomePage}
                    />
                    <Drawer.Screen name="Tasks" component={TaskPage}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </>
    );
};
