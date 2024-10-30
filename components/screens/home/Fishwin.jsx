import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { Component } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

const FishWin = [
  {
    NameKoi: "Koi Vàng Kim",

    CompetitionName: "Giải Cá Koi Quốc Gia 2023",
    image:
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
  },
  {
    NameKoi: "Koi Đen Tuyền",

    CompetitionName: "Cuộc Thi Cá Koi Đẹp Nhất",
    image:
      "https://i.pinimg.com/736x/ea/09/c4/ea09c4e5510f5d507b0f3ae7cdd488b0.jpg",
  },

  {
    NameKoi: "Koi Ngọc Bích",

    CompetitionName: "Cuộc Thi Cá Koi Quốc Tế 123 123",
    image:
      "https://i.pinimg.com/564x/b7/9b/6c/b79b6c9a2d61e3c5adbf1544696c8da4.jpg",
  },
  {
    NameKoi: "Koi Đỏ Rực Rỡ",

    CompetitionName: "Giải Cá Koi Xuất Sắc",

    image:
      "https://i.pinimg.com/564x/87/60/2e/87602e100fc33bfe7a1616482c899958.jpg",
  },
  {
    NameKoi: "Koi Trắng Ngọc",

    CompetitionName: "Cuộc Thi Cá Koi Đặc Biệt",
    image:
      "https://i.pinimg.com/564x/3e/3d/a2/3e3da2a6d16fab4b11687293307ec22e.jpg",
  },
  {
    NameKoi: "Koi Xanh Lục",

    CompetitionName: "Giải Cá Koi Vàng 2023",
    image:
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
  },
];

const { width } = Dimensions.get("window");

export class Fishwin extends Component {
  render() {
    const itemWidth = (width - 40) / 2; // Chiều rộng item trừ đi khoảng cách giữa các item (15px)
    const itemWidthImage = itemWidth - 10;
    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <Text style={styles.header}>Cá Koi quán quân:</Text>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={styles.seeMore}>Xem thêm </Text>
            <AntDesign name="right" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={FishWin}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.contestItem, { width: itemWidth }]}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={[styles.contestImage, { height: itemWidthImage }]}
                  resizeMode="cover"
                />
              </View>
              <View style={[styles.contentfish, { width: itemWidthImage }]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 5,
                  }}
                >
                  <FontAwesome5 name="trophy" size={12} color="#f45124" />

                  <Text style={styles.fishName}>{item.NameKoi}</Text>
                </View>
                <Text
                  style={styles.contestName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.CompetitionName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.NameKoi}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    );
  }
}

export default Fishwin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContent: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seeMore: { color: "gray" },
  header: {
    fontSize: 18,
    fontWeight: "700",

    color: "#f45124",
  },
  contestItem: {
    marginBottom: 10,
    alignItems: "center",
  },
  contestImage: {
    width: 100,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    transform: [{ rotate: "90deg" }],
  },
  contestName: {
    fontWeight: "500",
    fontSize: 12,
    paddingHorizontal: 4,
    marginBottom: 5,
    textAlign: "center",
  },
  fishName: {
    fontWeight: "600",
    marginLeft: 5,
    fontSize: 14,
  },
  listContainer: {
    justifyContent: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    height: 100,
  },
  contentfish: {
    paddingVertical: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,

    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
});
