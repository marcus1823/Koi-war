import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const fishProfiles = [
  { id: '1', code: '223', type: 'Koi', size: 'Large', age: '3 years', awardWinning: 'Yes', image: require('../../../assets/images/caKoi.png') },
  { id: '2', code: '224', type: 'Karashigoi', size: 'Medium', age: '2 years', awardWinning: 'No', image: require('../../../assets/images/caKoi.png') },
  { id: '3', code: '227', type: 'Koi', size: 'Medium', age: '2 years', awardWinning: 'No', image: require('../../../assets/images/caKoi.png') },
  { id: '4', code: '228', type: 'Karashigoi', size: 'Medium', age: '2 years', awardWinning: 'No', image: require('../../../assets/images/caKoi.png') },
  { id: '5', code: '229', type: 'Koi', size: 'Medium', age: '2 years', awardWinning: 'No', image: require('../../../assets/images/caKoi.png') },
  { id: '6', code: '230', type: 'Karashigoi', size: 'Medium', age: '2 years', awardWinning: 'No', image: require('../../../assets/images/caKoi.png') },
  { id: '7', code: '232', type: 'Koi', size: 'Medium', age: '2 years', awardWinning: 'No', image: require('../../../assets/images/caKoi.png') },
  { id: '8', code: '234', type: 'Karashigoi', size: 'Medium', age: '2 years', awardWinning: 'No', image: require('../../../assets/images/caKoi.png') },
  { id: '9', code: '245', type: 'Koi', size: 'Medium', age: '2 years', awardWinning: 'No', image: require('../../../assets/images/caKoi.png') },

];

export default function FishProfile() {
  const router = useRouter();

  const renderFishProfile = ({ item }) => (
    <View style={styles.profileContainer}>
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Koi fish code: </Text>
          <Text style={styles.item}>{item.code}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Fish type: </Text>
          <Text style={styles.item}>{item.type}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Size: </Text>
          <Text style={styles.item}>{item.size}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age: </Text>
          <Text style={styles.item}>{item.age}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Award winning: </Text>
          <Text style={styles.item}>{item.awardWinning}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" style={styles.backIcon} onPress={() => router.back()} />
        <Text style={styles.headerText}>Fish Profiles</Text>
      </View>

      {/* Fish Profiles List */}
      <FlatList
        data={fishProfiles}
        renderItem={renderFishProfile}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 140,
    height: 150,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  item: {
    fontSize: 16,
  },
});
