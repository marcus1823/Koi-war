import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getAllContestInstances } from '../../../api/competition/competitionApi';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function CompetitionDetailPage() {
  const { id } = useLocalSearchParams();
  const [competition, setCompetition] = useState<any | null>(null);

  useEffect(() => {
    const fetchCompetitionDetail = async () => {
      try {
        const data = await getAllContestInstances();
        const selectedCompetition = data.find((comp: any) => comp.id === id);
        setCompetition(selectedCompetition);
      } catch (error) {
        console.error('Error fetching competition details:', error);
      }
    };

    fetchCompetitionDetail();
  }, [id]);

  if (!competition) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const statusColor = competition.isActive ? '#4CAF50' : '#F44336';

  return (
    <>
      <LinearGradient
        colors={["#eb7452", "#5C98BB"]}
        style={styles.gradientOverlay}
      />
      <ScrollView style={styles.container}>
        <Image source={{ uri: competition.images }} style={styles.image} />
        <View style={styles.contentContainer}>
          <View style={styles.statusBadge}>
            <Text style={[styles.statusText, { color: statusColor }]}>{competition.isActive ? 'Open' : 'Closed'}</Text>
          </View>
          <Text style={styles.competitionName}>{competition.contest.name}</Text>
          <Text style={styles.description}>{competition.description}</Text>
          <View style={styles.infoSection}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.infoText}>
              {`${competition.startDate} - ${competition.endDate}`}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <Ionicons name="information-circle-outline" size={20} color="#666" />
            <Text style={styles.infoText}>
              Rules: <Text style={styles.highlight}>{competition.rules}</Text>
            </Text>
          </View>
          
          {competition.contestSubCategories && competition.contestSubCategories.length > 0 && (
            <View style={styles.subContestsContainer}>
              <Text style={styles.subContestsTitle}>Sub-Categories</Text>
              {competition.contestSubCategories.map((subCategory: any, index: number) => (
                <View key={subCategory.id} style={styles.subContestItem}>
                  <View style={styles.subContestHeader}>
                    <Text style={styles.subContestName}>{subCategory.name}</Text>
                  </View>
                  <Text style={styles.subContestDescription}>{subCategory.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 200,
    height: 50,
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  statusBadge: {
    position: 'absolute',
    top: -15,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  competitionName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#e67e22',
  },
  subContestsContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 20,
  },
  subContestsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  subContestItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subContestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subContestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  subContestDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
