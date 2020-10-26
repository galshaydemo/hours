import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Home'
import Report from '../Report'
const Stack = createStackNavigator();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
};


export {MainStackNavigator};
