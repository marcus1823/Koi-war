import { View } from "react-native";
import React, { Component } from "react";
import HeaderCompetition from "@/components/screens/Staff/HeaderCompetition";

export class ManageCompetition extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderCompetition />
      </View>
    );
  }
}

export default ManageCompetition;
