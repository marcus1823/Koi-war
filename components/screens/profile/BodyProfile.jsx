import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BodyProfile() {
  const router = useRouter();
  const [fishData, setFishData] = useState([
    { id: '1', name: 'Cá Dự Thi 1' },
    { id: '2', name: 'Cá Dự Thi 2' },
    { id: '3', name: 'Cá Dự Thi 3' },
    { id: '4', name: 'Cá Dự Thi 4' },
  ]);

  const navigateToFishDetail = (fish) => {
    router.push({
      pathname: "/fishdetail",
      params: { fishId: fish.id, fishName: fish.name },
    });
  };
  const navigateToWaittingApproval = () => {
    router.push("/waittingapproval");
  };
  const navigateToApprove = () => {
    router.push("/approve");
  };
  const navigateToIsGoing = () => {
    router.push("/isgoing");
  };

  const renderFishItem = ({ item }) => (
    <TouchableOpacity style={styles.fishItem} onPress={() => navigateToFishDetail(item)}>
      <Text style={styles.fishText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Cuộc thi</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusContainer}>
          <TouchableOpacity style={styles.statusItem} onPress={navigateToWaittingApproval}>
            <View style={styles.card}>
              <AntDesign name="filetext1" size={24} color="black" />
              <Text style={styles.statusText}>Chờ duyệt đơn</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statusItem} onPress={navigateToApprove}>
            <View style={styles.card}>
              <AntDesign name="inbox" size={24} color="black" />
              <Text style={styles.statusText}>Đã duyệt</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statusItem} onPress={navigateToIsGoing}>
            <View style={styles.card}>
              <AntDesign name="clockcircleo" size={24} color="black" />
              <Text style={styles.statusText}>Đang diễn ra</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statusItem}>
            <View style={styles.card}>
              <AntDesign name="staro" size={24} color="black" />
              <Text style={styles.statusText}>Kết thúc</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.title}>Cá Profile</Text>
        <FlatList
          data={fishData.slice(0, 3)}
          renderItem={renderFishItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusItem: {
    alignItems: 'center',
    marginHorizontal: 5, // Add horizontal margin for spacing
  },
  statusText: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f28f35', // Border color to match your theme
    alignItems: 'center', // Center items inside the card
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // For Android shadow
    width: 100, // Fixed width for cards to make them equal
    height: 100, // Fixed height for consistency
    justifyContent: 'center', // Center content vertically
  },
  fishItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#f28f35',
  },
  fishText: {
    fontSize: 15,
    color: '#b55600',
    fontWeight: 'medium',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc', // Color of the separator
    marginVertical: 15,
    width: '100%',
  },
});
