import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.PRIMARY
    }}>
      <Tabs.Screen name='home'
        options={{
          tabBarLabel: 'Home', 
          tabBarIcon: ({color}) => <Feather name="home" size={24} color="black" />
        }}
        />
        <Tabs.Screen name='profile' 
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />
            }}/>
        
    </Tabs>
  )
}