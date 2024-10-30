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
const FishWin = [
  {
    NameKoi: "Koi Vàng Kim",
    ContestantName: "Nguyễn Văn A",
    CompetitionName: "Giải Cá Koi Quốc Gia 2023",
    image:
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
  },
  {
    NameKoi: "Koi Đen Tuyền",
    ContestantName: "Trần Thị B",
    CompetitionName: "Cuộc Thi Cá Koi Đẹp Nhất",
    image:
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
  },
  {
    NameKoi: "Koi Bướm",
    ContestantName: "Lê Văn C",
    CompetitionName: "Giải Thưởng Cá Koi 2023",
    image:
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
  },
  {
    NameKoi: "Koi Ngọc Bích",
    ContestantName: "Phạm Thị D",
    CompetitionName: "Cuộc Thi Cá Koi Quốc Tế",
    image:
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
  },
  {
    NameKoi: "Koi Đỏ Rực Rỡ",
    ContestantName: "Hoàng Văn E",
    CompetitionName: "Giải Cá Koi Xuất Sắc",
    image:
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
  },
  {
    NameKoi: "Koi Trắng Ngọc",
    ContestantName: "Nguyễn Thị F",
    CompetitionName: "Cuộc Thi Cá Koi Đặc Biệt",
    image:
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
  },
  {
    NameKoi: "Koi Xanh Lục",
    ContestantName: "Trần Văn G",
    CompetitionName: "Giải Cá Koi Vàng 2023",
    image:
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
  },
];
const { width } = Dimensions.get("window");
export class Fishwin extends Component {
  render() {
    const itemWidth = width / 2;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Cuộc thi mới cho bạn:</Text>
        <FlatList
          data={FishWin}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.contestItem]}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={[
                    styles.contestImage,
                    { height: itemWidth },
                    { transform: [{ rotate: "90deg" }] }, // Sử dụng mảng cho transform
                  ]}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.contestName}>{item.NameKoi}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.NameKoi}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
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
  },
  contestImage: {
    // width: "100%",

    borderRadius: 5,
  },
  contestName: {
    fontWeight: "600",
  },

  listContainer: {
    justifyContent: "space-between",
  },
});
