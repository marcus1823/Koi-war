import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const isgoingdOrders = [
  { id: '4', fishName: 'Cá Betta', date: 'Ngày đặt: 28/09/2024', status: 'Cuộc thi đang diễn ra' },
  { id: '5', fishName: 'Cá Tetra', date: 'Ngày đặt: 29/09/2024', status: 'Cuộc thi đang diễn ra' },
  { id: '6', fishName: 'Cá Neon', date: 'Ngày đặt: 30/09/2024', status: 'Cuộc thi đang diễn ra' },
];

export default function IsGoing() {
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderTitle}>{item.fishName}</Text>
      <Text style={styles.orderDate}>{item.date}</Text>
      <Text style={styles.orderStatus}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Đang diễn ra</Text>
      <FlatList
        data={isgoingdOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orderList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  orderList: {
    width: '100%',
    paddingHorizontal: 0, // No horizontal padding
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20, // Increased padding for better spacing
    marginVertical: 12, // Increased vertical margin
    width: 380, // Set width to 100% to fill the screen width
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3, // Elevated shadow
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  orderStatus: {
    fontSize: 16,
    color: '#0288d1',
    marginTop: 4,
  },
});
