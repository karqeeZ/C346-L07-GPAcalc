import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Add from './Add';
import Edit from './Edit';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/*the screen placed at the top will be the landing page*/}
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='Add' component={Add}/>
                <Stack.Screen name='Edit' component={Edit}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;
