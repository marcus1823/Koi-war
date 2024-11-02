import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ContestsScreen from './contest/contests.tsx';
import DashboardScreen from './dashboard/index';

const Stack = createStackNavigator();

const AdminManagement = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="dashboard" component={DashboardScreen} />
        <Stack.Screen name="contest" component={ContestsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AdminManagement;