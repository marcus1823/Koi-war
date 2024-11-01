import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getMyKoiFishes, KoiFish } from '../../api/koi/myKoiApi';

export default function BodyProfile() {
  const router = useRouter();
  const [myFish, setMyFish] = useState<KoiFish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyFish();
  }, []);

  const fetchMyFish = async () => {
    try {
      const response = await getMyKoiFishes() as { success: boolean; data: KoiFish[] };
      setMyFish(response.data);
      console.log(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToFishDetail = (fish: KoiFish) => {
    router.push({
      pathname: "/myKoi/detail/[id]",
      params: { id: fish._id }
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

  const renderFishItem = ({ item }: { item: KoiFish }) => (
    <TouchableOpacity style={styles.fishItem} onPress={() => navigateToFishDetail(item)}>
      <Text style={styles.fishText}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#f28f35" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

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
        <View style={styles.headerContainer}>
          <Text style={styles.title}>CÁ CỦA TÔI</Text>
          <Text style={styles.headerSubtitle}>Bộ Sưu Tập</Text>
        </View>

        <View style={styles.statsOverview}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{myFish.length}</Text>
            <Text style={styles.statLabel}>Tổng Cá Koi</Text>
          </View>
        </View>

        <FlatList
          data={myFish}
          renderItem={renderFishItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2d3436',
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statusItem: {
    marginRight: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 110,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#4a4a4a',
  },
  separator: {
    height: 16,
  },
  fishItem: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#edf2f7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  fishText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3436',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  statsOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    minWidth: 100,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    color: '#f28f35',
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 16,
  },
});