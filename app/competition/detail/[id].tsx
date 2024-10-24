import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { competitionProfiles } from '../competition'
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CompetitionDetailPage() {
  const { id } = useLocalSearchParams();
  const [competition, setCompetition] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const selectedCompetition = competitionProfiles.find(comp => comp.id === parseInt(id as string, 10));
      setCompetition(selectedCompetition);
    }
  }, [id]);

  if (!competition) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const statusColor = competition.Status.toLowerCase() === 'open' ? '#4CAF50' : '#F44336';

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: competition.Name,
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: 'rgb(245, 177, 109)' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.container}>
        <Image source={{ uri: competition.image }} style={styles.image} />
        <LinearGradient
          colors={['rgba(245, 177, 109, 0.8)', 'rgba(204, 0, 0, 0.8)']}
          style={styles.gradientOverlay}
        />
        <View style={styles.contentContainer}>
          <View style={styles.statusBadge}>
            <Text style={[styles.statusText, { color: statusColor }]}>{competition.Status}</Text>
          </View>
          <Text style={styles.competitionName}>{competition.Name}</Text>
          <Text style={styles.description}>{competition.Description}</Text>
          <View style={styles.infoSection}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.infoText}>
              {`${competition.StartDate} - ${competition.EndDate}`}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <Ionicons name="information-circle-outline" size={20} color="#666" />
            <Text style={styles.infoText}>
              Rule: <Text style={styles.highlight}>{competition.Rule}</Text>
            </Text>
          </View>
          
          {competition.SubContests && competition.SubContests.length > 0 && (
            <View style={styles.subContestsContainer}>
              <Text style={styles.subContestsTitle}>Sub-Contests</Text>
              {competition.SubContests.map((subContest: any, index: number) => (
                <View key={subContest.id} style={styles.subContestItem}>
                  <View style={styles.subContestHeader}>
                    <View style={styles.subContestIcon}>
                      <Text style={styles.subContestIconText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.subContestName}>{subContest.Name}</Text>
                  </View>
                  <Text style={styles.subContestDescription}>{subContest.Description}</Text>
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
  backButton: {
    marginLeft: 10,
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
  registerButton: {
    backgroundColor: '#e67e22',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  subContestIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgb(245, 177, 109)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  subContestIconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
