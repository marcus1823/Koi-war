import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "../../../constants/Colors";
import ManageCompetition from "../manageCompetition";

export default function TabLayout() {
  return (
    <>
      <ManageCompetition />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarInactiveTintColor: "#666",
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#eee',
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
        }}
      >
        <Tabs.Screen
          name="manageCompetition"
          options={{
            tabBarLabel: "Quản lí cuộc thi",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="manage-search" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="registrations"
          options={{
            tabBarLabel: "Đăng ký",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="clipboard-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Thông tin cá nhân",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
