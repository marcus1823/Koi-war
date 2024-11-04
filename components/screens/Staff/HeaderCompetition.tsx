import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Colors } from "../../../constants/Colors";
import { getAllContestInstances } from "../../../api/competitionApi";

type CompetitionProfile = {
  id: string;
  contest: {
    id: string;
    name: string;
    description: string;
    contestInstances: any[];
  };
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description: string;
  rules: string;
  images: string;
  isDisabled: boolean;
  contestSubCategories: {
    id: string;
    name: string;
    description: string;
    contestInstance: string;
    classificationContestRule: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

const HeaderCompetition = () => {
  const router = useRouter();
  const [contests, setContests] = useState<CompetitionProfile[]>([]);
  const currentDate = new Date();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const data = await getAllContestInstances();
        setContests(data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  const handleContest = (contestId: string) => {
    if (contestId) {
      router.push({
        pathname: `/staff/manageCompetition/detail/[id]`,
        params: { id: contestId }
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#eb7452", "#5C98BB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={24} color={Colors.PRIMARY} />
          <TextInput
            placeholder="Tìm kiếm cuộc thi..."
            style={styles.searchInput}
          />
        </View>
      </LinearGradient>

      <View style={styles.contestCardNote}>
        <Text style={{ fontWeight: "700", marginBottom: 10, fontSize: 16 }}>
          Trạng thái cuộc thi:
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ flexDirection: "row", width: "50%" }}>
            <FontAwesome name="circle" size={20} color="black" />
            <Text style={{ marginLeft: 5, fontWeight: "500" }}>Bị hủy</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="circle" size={20} color="#28a745" />
            <Text style={{ marginLeft: 5, fontWeight: "500" }}>
              Đang diễn ra
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", width: "50%" }}>
            <FontAwesome name="circle" size={20} color="#ff0000" />
            <Text style={{ marginLeft: 5, fontWeight: "500" }}>Kết thúc</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="circle" size={20} color="#f48516" />
            <Text style={{ marginLeft: 5, fontWeight: "500" }}>
              Sắp diễn ra
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={contests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          let statusColor;

          if (item.isDisabled) {
            statusColor = "black";
          } else if (!item.isActive && currentDate > new Date(item.endDate)) {
            statusColor = "#ff0000";
          } else if (
            currentDate >= new Date(item.startDate) &&
            currentDate < new Date(item.endDate)
          ) {
            statusColor = "#28a745";
          } else if (currentDate < new Date(item.startDate)) {
            statusColor = "#f48516";
          }

          return (
            <TouchableOpacity
              onPress={() => handleContest(item.id)}
              disabled={item.isDisabled}
            >
              <View style={styles.contestCard}>
                <View
                  style={[
                    styles.statuscontest,
                    { backgroundColor: statusColor },
                  ]}
                />
                <View style={styles.contentContest}>
                  <Image
                    source={{ uri: Array.isArray(item.images) ? item.images[0] : item.images }}
                    style={styles.contestImage}
                  />
                  <View style={styles.contestInfo}>
                    <Text style={styles.contestMainTitle}>
                      {item.contest?.name || "Không có tên cuộc thi"}
                    </Text>
                    <Text style={styles.contestTitle}>
                      {item.name || "Không có tên phiên bản"}
                    </Text>
                    <Text style={styles.contestDate}>
                      Ngày bắt đầu: {item.startDate ? new Date(item.startDate).toLocaleDateString() : "N/A"}
                    </Text>
                    <Text style={styles.contestDate}>
                      Ngày kết thúc: {item.endDate ? new Date(item.endDate).toLocaleDateString() : "N/A"}
                    </Text>
                    <Text style={styles.contestStatus}>
                      Trạng thái: {item.isActive ? "Đang hoạt động" : "Không hoạt động"}
                    </Text>
                    <Text style={styles.subCategoriesCount}>
                      Số hạng mục: {item.contestSubCategories?.length || 0}
                    </Text>
                  </View>
                </View>
                {item.isDisabled && <View style={styles.disabledOverlay} />}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HeaderCompetition;

const styles = StyleSheet.create({
  headerGradient: {
    paddingBottom: 15,
    paddingTop: 55,
    backgroundColor: Colors.PRIMARY,
    elevation: 5,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 45,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 100,
    elevation: 5,
  },
  searchInput: {
    fontFamily: "outfit",
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 5,
  },
  contestCardNote: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
  },
  contestCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    elevation: 2,
    borderRadius: 10,
  },
  statuscontest: {
    width: 5,
    height: "100%",
  },
  contentContest: {
    padding: 10,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contestImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  contestInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
  contestMainTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 3,
    flexWrap: "wrap",
    color: "#f45124",
  },
  contestTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    flexWrap: "wrap",
    color: "#666",
  },
  contestDate: {
    color: "#555",
    marginBottom: 3,
    fontSize: 12,
  },
  contestStatus: {
    fontSize: 12,
    color: "#555",
    marginBottom: 3,
  },
  subCategoriesCount: {
    fontSize: 12,
    color: "#555",
    fontWeight: "500",
  },
  disabledOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.3,
    borderRadius: 10,
  },
});
