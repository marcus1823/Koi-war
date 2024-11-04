import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { getAllRegistrations } from '../../../api/registrationAPI';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function WaitingApproval() {
  const router = useRouter();
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await getAllRegistrations();
      const pendingOnly = response.filter(reg => reg.status === 'pending');
      setPendingRegistrations(pendingOnly);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => router.push({ 
        pathname: "/myKoi/detail/[id]", 
        params: { id: item.fish._id } 
      })}
    >
      <View style={styles.orderItem}>
        <View style={styles.fishInfo}>
          <Image
            source={{ uri: item.fish.images[0] }}
            style={styles.fishImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.orderTitle}>{item.fish.name}</Text>
            <Text style={styles.orderInfo}>
              {item.contestInstance.name}
            </Text>
            <Text style={styles.orderInfo}>
              {item.contestSubCategory.name}
            </Text>
            <Text style={styles.fishDetails}>
              {item.fish.length}cm | {item.fish.weight}kg
            </Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Đang chờ duyệt</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#F5B16D" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <AntDesign name="arrowleft" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Đơn Chờ Duyệt</Text>
        <Text style={styles.totalCount}>
          {pendingRegistrations.length} đơn
        </Text>
      </View>

      <FlatList
        data={pendingRegistrations}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.orderList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AntDesign name="inbox" size={50} color="#ccc" />
            <Text style={styles.emptyText}>Không có đơn đăng ký nào đang chờ duyệt</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: StatusBar.currentHeight || 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalCount: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  orderList: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fishInfo: {
    flexDirection: 'row',
  },
  fishImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  orderInfo: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
  },
  fishDetails: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F5B16D',
    marginRight: 6,
  },
  statusText: {
    color: '#F5B16D',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});