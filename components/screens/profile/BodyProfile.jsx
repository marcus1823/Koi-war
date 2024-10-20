import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function BodyProfile() {
  const router = useRouter();

  const navigateToFishProfile = () => {
    router.push("/fishprofile"); 
  };

  const navigateToProgress = () => {
    router.push("/progress"); 
  };

  const navigateToResults = () => {
    router.push("/predictresults"); 
  };

  return (
    <View>
      <View style={styles.container}>
        
        {/* Section for Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.achievementsTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievementBadge}>
              <Text style={styles.badgeText}>🏆 Top Koi Breeder</Text>
            </View>
            <View style={styles.achievementBadge}>
              <Text style={styles.badgeText}>🥇 Exhibition Champion</Text>
            </View>
            <View style={styles.achievementBadge}>
              <Text style={styles.badgeText}>🎖️ Best Fish Caretaker</Text>
            </View>
          </View>
          <View style={styles.underline} />
        </View>

        {/* Section for Fish Profile */}
        <TouchableOpacity style={styles.fishProfileContainer} onPress={navigateToFishProfile}>
          <Image source={{ uri: 'https://i.pinimg.com/enabled/236x/4e/e2/d0/4ee2d057d1585e55f8052609c8e4d060.jpg' }} style={styles.fishImage} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>My Fish Profile</Text>
            <Text style={styles.description}>View and edit your fish details</Text>
          </View>
          <AntDesign name="right" size={24} color="black" style={{ marginTop: 8 }} />
        </TouchableOpacity>
        <View style={styles.underline} />

        {/* Section for Ongoing Contest */}
        <TouchableOpacity style={styles.fishProfileContainer} onPress={navigateToProgress}>
          <Image source={{ uri: 'https://i.pinimg.com/enabled/236x/4e/e2/d0/4ee2d057d1585e55f8052609c8e4d060.jpg' }} style={styles.fishImage} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Contest currently in progress</Text>
            <Text style={styles.description}>See which contests are ongoing</Text>
          </View>
          <AntDesign name="right" size={24} color="black" style={{ marginTop: 8 }} />
        </TouchableOpacity>
        <View style={styles.underline} />

        {/* Section for Predict Results */}
        <TouchableOpacity style={styles.fishProfileContainer} onPress={navigateToResults}>
          <Image source={{ uri: 'https://i.pinimg.com/enabled/236x/4e/e2/d0/4ee2d057d1585e55f8052609c8e4d060.jpg' }} style={styles.fishImage} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Predict results</Text>
            <Text style={styles.description}>Guess the winners and see predictions</Text>
          </View>
          <AntDesign name="right" size={24} color="black" style={{ marginTop: 8 }} />
        </TouchableOpacity>
        <View style={styles.underline} />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Light background for better contrast
  },
  achievementsContainer: {
    marginBottom: 20,
  },
  achievementsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  achievementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  achievementBadge: {
    backgroundColor: '#e1f5fe',
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  badgeText: {
    fontSize: 14,
  },
  fishProfileContainer: {
    backgroundColor: 'transparent', // Remove background color for the container
    padding: 8,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fishImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
  },
  underline: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
