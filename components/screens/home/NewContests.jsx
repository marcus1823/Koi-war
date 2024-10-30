import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const koiCompetitionData = [
  {
    openday: "2023-10-01",
    closeday: "2023-10-15",
    apply: true,
    name: "Cuộc thi cá Koi mùa thu 2023",
    image:
      "https://kodamakoishow.com/wp-content/uploads/2024/10/5th-Kodama-Virtual-Koi-Show.jpg",
  },
  {
    openday: "2023-11-01",
    closeday: "2023-11-15",
    apply: false,
    name: "Cuộc thi cá Koi mùa đông 2023",
    image:
      "https://i.pinimg.com/564x/bf/69/5f/bf695f58110594bac0b2976b9e942691.jpg",
  },
  {
    openday: "2024-01-01",
    closeday: "2024-01-15",
    apply: true,
    name: "Cuộc thi cá Koi đầu năm 2024",
    image:
      "https://i.pinimg.com/564x/bf/69/5f/bf695f58110594bac0b2976b9e942691.jpg",
  },
  {
    openday: "2024-03-01",
    closeday: "2024-03-15",
    apply: true,
    name: "Cuộc thi cá Koi mùa xuân 2024",
    image:
      "https://i.pinimg.com/564x/1e/bc/57/1ebc57ef6836882d44cb0fefca503d22.jpg",
  },
  {
    openday: "2024-06-01",
    closeday: "2024-06-15",
    apply: false,
    name: "Cuộc thi cá Koi mùa hè 2024",
    image:
      "https://kodamakoishow.com/wp-content/uploads/2024/10/5th-Kodama-Virtual-Koi-Show.jpg",
  },
];
export class NewContests extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Cuộc thi mới cho bạn:</Text>
        <FlatList
          data={koiCompetitionData}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.contestItem}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.contestImage}
                  resizeMode="cover"
                />
                {item.apply && (
                  <MaterialCommunityIcons
                    name="check-decagram"
                    size={40}
                    color="#f45124"
                    style={styles.icon}
                  />
                )}
              </View>
              <Text style={styles.contestName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default NewContests;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    marginTop: 10,

    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#f45124",
  },
  contestItem: {
    borderRadius: 10,

    marginRight: 20,
    width: 270,
    position: "relative",
  },
  contestImage: {
    width: "100%",
    height: 125,
    borderRadius: 5,
    marginBottom: 5,
  },
  contestName: {
    fontWeight: "600",
  },
  icon: {
    position: "absolute",
    top: -15,
    right: -15,
    marginLeft: 20,
  },
  imageContainer: {
    position: "relative",
    marginTop: 10,
  },
});
