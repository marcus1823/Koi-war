import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";

export default function IntroHome() {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../../../assets/images/koi2.png")}
        style={styles.image}
      />
      <View style={styles.textOverlay}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.header}>KOI WAR</Text>
        <Text style={styles.slogan}>
          Tìm hiểu - Khám phá - Cạnh tranh cá Koi
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  imageContainer: {
    width: "95%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textOverlay: {
    position: "absolute",
    top: 0, // Đặt từ trên cùng
    left: 0, // Đặt từ bên trái
    right: 0, // Đặt từ bên phải
    bottom: 0, // Đặt từ dưới cùng
    alignItems: "center",
    justifyContent: "center", // Căn giữa nội dung
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  logo: {
    width: 80,
    height: 80,
  },
  header: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 5,

    fontFamily: "outfit-bold",
  },
  slogan: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "700",
    paddingBottom: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#cc0000",
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: "#555",
  },
  contestantList: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#444",
  },
  koiCard: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 10,
  },
  koiImages: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  koiSection: {
    alignItems: "center",
    flex: 1,
  },
  koiImage: {
    width: 70,
    height: 150,
    resizeMode: "cover",
    marginBottom: 10,
  },
  koiLabel: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  koiName: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  koiDetail: {
    fontSize: 14,
    color: "#555",
  },
});
