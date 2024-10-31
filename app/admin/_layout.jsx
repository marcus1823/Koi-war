import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function TabAdminLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.PRIMARY
    }}>
      <Tabs.Screen name='dashboard'
        options={{
          tabBarLabel: 'Bảng điều khiển', 
          tabBarIcon: ({color}) => <Feather name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen name='contest'
        options={{
          tabBarLabel: 'Cuộc thi',
          tabBarIcon: ({color}) => <Ionicons name="trophy-outline" size={24} color={color} />
        }}
      />
            <Tabs.Screen name='user'
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({color}) => <Ionicons name="trophy-outline" size={24} color={color} />
        }}
      />
    </Tabs>
  )
}