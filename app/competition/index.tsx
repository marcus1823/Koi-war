import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { competitionProfiles } from './competition';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type CompetitionProfile = {
  id: number;
  Name: string;
  Description: string;
  Rule: string;
  UpdateDate: string;
  Status: string;
  StartDate: string;
  EndDate: string;
  image: string;
};

export default function CompetitionHomePage() {
  const [competitions, setCompetitions] = useState<CompetitionProfile[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();

  useEffect(() => {
    setCompetitions(competitionProfiles);
  }, []);

  const filteredCompetitions = competitions.filter(comp => {
    if (activeTab === 'all') return true;
    if (activeTab === 'open') return comp.Status === 'Open';
    if (activeTab === 'closed') return comp.Status === 'Closed';
    return true;
  });

  const renderItem = ({ item }: { item: CompetitionProfile }) => {
    return (
      <TouchableOpacity 
        style={styles.competitionCard}
        onPress={() => router.push(`/competition/detail/${item.id}`)}
      >
        <Image source={{ uri: item.image }} style={styles.competitionImage} />
        <View style={styles.competitionInfo}>
          <Text style={styles.competitionName}>{item.Name}</Text>
          <Text style={styles.competitionDescription} numberOfLines={2}>{item.Description}</Text>
          <View style={styles.competitionDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{item.StartDate} - {item.EndDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="information-circle-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{item.Rule}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, item.Status === 'Open' ? styles.statusOpen : styles.statusClosed]}>
            <Text style={styles.statusText}>{item.Status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Competitions",
          headerShown: true,
        }} 
      />
      <LinearGradient
        colors={['rgb(245, 177, 109)', 'rgb(204, 0, 0)']}
        style={styles.container}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>EXPLORE</Text>
          <Text style={styles.headerSubtitle}>Upcoming Competitions</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'open' && styles.activeTab]}
            onPress={() => setActiveTab('open')}
          >
            <Text style={[styles.tabText, activeTab === 'open' && styles.activeTabText]}>Open</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'closed' && styles.activeTab]}
            onPress={() => setActiveTab('closed')}
          >
            <Text style={[styles.tabText, activeTab === 'closed' && styles.activeTabText]}>Closed</Text>
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
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
