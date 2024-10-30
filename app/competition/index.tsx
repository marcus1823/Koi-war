import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getAllContestInstances } from '../../api/competition/competitionApi';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function CompetitionHomePage() {
  const [competitions, setCompetitions] = useState<CompetitionProfile[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const data = await getAllContestInstances();
        const formattedData = data.map((item: any) => ({
          id: item.id,
          contest: {
            id: item.contest.id,
            name: item.contest.name,
            description: item.contest.description,
            contestInstances: item.contest.contestInstances,
          },
          name: item.name,
          startDate: item.startDate,
          endDate: item.endDate,
          isActive: item.isActive,
          description: item.description,
          rules: item.rules,
          images: item.images,
          isDisabled: item.isDisabled,
          contestSubCategories: item.contestSubCategories,
        }));
        setCompetitions(formattedData);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };

    fetchCompetitions();
  }, []);

  const filteredCompetitions = competitions.filter(comp => {
    if (activeTab === 'all') return true;
    if (activeTab === 'open') return comp.isActive;
    if (activeTab === 'closed') return !comp.isActive;
    return true;
  });

  const renderItem = ({ item }: { item: CompetitionProfile }) => {
    return (
      <TouchableOpacity 
        style={styles.competitionCard}
        onPress={() => router.push(`/competition/detail/${item.id}`)}
      >
        <Image source={{ uri: item.images }} style={styles.competitionImage} />
        <View style={styles.competitionInfo}>
          <Text style={styles.competitionName}>{item.contest.name}</Text>
          <Text style={styles.competitionDescription} numberOfLines={2}>{item.contest.description}</Text>
          <View style={styles.competitionDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{formatDate(item.startDate)} - {formatDate(item.endDate)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="information-circle-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{item.rules}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, item.isActive ? styles.statusOpen : styles.statusClosed]}>
            <Text style={styles.statusText}>{item.isActive ? 'Open' : 'Closed'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Cuộc Thi",
          headerShown: true,
        }} 
      />
      <LinearGradient
        colors={["#eb7452", "#5C98BB"]}
        style={styles.container}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>KHÁM PHÁ</Text>
          <Text style={styles.headerSubtitle}>Cuộc Thi Sắp Diễn Ra</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>Tất Cả</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'open' && styles.activeTab]}
            onPress={() => setActiveTab('open')}
          >
            <Text style={[styles.tabText, activeTab === 'open' && styles.activeTabText]}>Mở</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'closed' && styles.activeTab]}
            onPress={() => setActiveTab('closed')}
          >
            <Text style={[styles.tabText, activeTab === 'closed' && styles.activeTabText]}>Đã Đóng</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredCompetitions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  headerContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -1,
  },
  headerSubtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  competitionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  competitionImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  competitionInfo: {
    padding: 15,
  },
  competitionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  competitionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  competitionDetails: {
    marginTop: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  statusBadge: {
    position: 'absolute',
    top: -35,
    right: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusOpen: {
    backgroundColor: '#4CAF50',
  },
  statusClosed: {
    backgroundColor: '#F44336',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#eb7452',
  },
});
