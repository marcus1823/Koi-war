import React from "react";
import { View, Text, ScrollView } from "react-native";
import LoginScreen from "../components/screens/LoginScreen";
function login() {
  return (
    <ScrollView>
      <LoginScreen />
    </ScrollView>
  );
}

export default login;
