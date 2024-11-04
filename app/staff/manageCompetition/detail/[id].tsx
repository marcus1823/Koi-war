import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { getAllContestInstances } from "../../../../api/competitionApi";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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

const CompetitionDetailPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [contest, setContest] = useState<CompetitionProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentDate = new Date();

  useEffect(() => {
    const fetchContestDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getAllContestInstances();
        const foundContest = data.find((item: CompetitionProfile) => item.id === id);
        if (foundContest) {
          setContest(foundContest);
        } else {
          setError("Không tìm thấy cuộc thi này");
        }
      } catch (error) {
        console.error("Error fetching contest:", error);
        setError("Đã có lỗi xảy ra khi tải thông tin cuộc thi");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContestDetail();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#f45124" />
        <Text style={styles.loadingText}>Đang tải thông tin cuộc thi...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.errorContainer}>
          <AntDesign name="exclamationcircle" size={50} color="#f45124" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.errorButton}
            onPress={() => router.back()}
          >
            <Text style={styles.errorButtonText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  let statusColor;
  if (!contest) return null;
  
  if (contest.isDisabled) {
    statusColor = "black";
  } else if (!contest.isActive && currentDate > new Date(contest.endDate)) {
    statusColor = "#ff0000";
  } else if (
    currentDate >= new Date(contest.startDate) &&
    currentDate < new Date(contest.endDate)
  ) {
    statusColor = "#28a745";
  } else if (currentDate < new Date(contest.startDate)) {
    statusColor = "#f48516";
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết cuộc thi</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: Array.isArray(contest.images) ? contest.images[0] : contest.images }}
            style={styles.contestImage}
            resizeMode="cover"
          />
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>
              {contest.isDisabled
                ? "Đã hủy"
                : !contest.isActive && currentDate > new Date(contest.endDate)
                ? "Đã kết thúc"
                : currentDate >= new Date(contest.startDate) &&
                  currentDate < new Date(contest.endDate)
                ? "Đang diễn ra"
                : "Sắp diễn ra"}
            </Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.contestMainTitle}>{contest.contest?.name}</Text>
          <Text style={styles.contestTitle}>{contest.name}</Text>
          
          <View style={styles.dateContainer}>
            <View style={styles.infoSection}>
              <FontAwesome name="calendar" size={20} color="#f45124" />
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Bắt đầu</Text>
                <Text style={styles.dateText}>
                  {new Date(contest.startDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
            
            <View style={styles.infoSection}>
              <FontAwesome name="calendar-check-o" size={20} color="#f45124" />
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Kết thúc</Text>
                <Text style={styles.dateText}>
                  {new Date(contest.endDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Mô tả</Text>
            <Text style={styles.descriptionText}>{contest.description}</Text>
          </View>

          <View style={styles.rulesSection}>
            <Text style={styles.sectionTitle}>Luật thi đấu</Text>
            <Text style={styles.rulesText}>{contest.rules}</Text>
          </View>

          <View style={styles.subCategoriesSection}>
            <Text style={styles.sectionTitle}>Hạng mục thi đấu ({contest.contestSubCategories.length})</Text>
            {contest.contestSubCategories.map((category, index) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryItem}
                onPress={() => router.push({
                  pathname: `/staff/manageCompetition/subContest/[id]`,
                  params: { id: category.id }
                })}
              >
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contestImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 8,
    borderRadius: 15,
    margin: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  contestMainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f45124',
    marginBottom: 4,
  },
  contestTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  descriptionSection: {
    marginTop: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  rulesSection: {
    marginTop: 16,
  },
  rulesText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  subCategoriesSection: {
    marginTop: 16,
  },
  categoryItem: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f45124',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  errorButton: {
    backgroundColor: '#f45124',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  errorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  dateTextContainer: {
    marginLeft: 12,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

export default CompetitionDetailPage;
