import { AntDesign } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
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
          tabBarIcon: ({color}) => <Feather name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen name='competition'
        options={{
          tabBarLabel: 'Competitions',
          tabBarIcon: ({color}) => <Ionicons name="trophy-outline" size={24} color={color} />
        }}
      />
      <Tabs.Screen name='profile' 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />
        }}
      />
    </Tabs>
  )
}