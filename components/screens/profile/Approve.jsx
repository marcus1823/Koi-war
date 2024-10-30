import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const approvedOrders = [
  { id: '4', fishName: 'Cá Betta', date: 'Ngày đăng kí: 28/09/2024', status: 'Đã duyệt' },
  { id: '5', fishName: 'Cá Tetra', date: 'Ngày đăng kí: 29/09/2024', status: 'Đã duyệt' },
  { id: '6', fishName: 'Cá Neon', date: 'Ngày đăng kí: 30/09/2024', status: 'Đã duyệt' },
];

export default function WaitingApproval() {
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderTitle}>{item.fishName}</Text>
      <Text style={styles.orderDate}>{item.date}</Text>
      <Text style={styles.orderStatus}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Đơn đã duyệt</Text>
      <FlatList
        data={approvedOrders}
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
