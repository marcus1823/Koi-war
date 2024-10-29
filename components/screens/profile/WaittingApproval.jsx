import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const pendingOrders = [
  { id: '1', fishName: 'Cá Chép', date: 'Ngày đăng kí: 01/10/2024', status: 'Đang chờ duyệt' },
  { id: '2', fishName: 'Cá Koi', date: 'Ngày đăng kí: 02/10/2024', status: 'Đang chờ duyệt' },
  { id: '3', fishName: 'Cá Vàng', date: 'Ngày đăng kí: 03/10/2024', status: 'Đang chờ duyệt' },
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
      <Text style={styles.title}>Đơn của bạn đang chờ duyệt</Text>
      <Text style={styles.message}>
        Cảm ơn bạn đã đăng kí. Dưới đây là danh sách các đơn hàng đang chờ xử lý.
      </Text>
      
      <FlatList
        data={pendingOrders}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
    paddingTop: 50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
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
