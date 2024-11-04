import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getMyKoiFishes, KoiFish } from '../../api/koi/myKoiApi';
import { getAllRegistrations } from '@/api/registrationAPI';

export default function BodyProfile() {
  const router = useRouter();
  const [myFish, setMyFish] = useState<KoiFish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    fetchMyFish();
    fetchRegistrationCounts();
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

  const fetchRegistrationCounts = async () => {
    try {
      const response = await getAllRegistrations();
      setPendingCount(response.filter((reg: any) => reg.status === 'pending').length);
      setApprovedCount(response.filter((reg: any) => reg.status === 'approved').length);
      setRejectedCount(response.filter((reg: any) => reg.status === 'rejected').length);
      setCheckedCount(response.filter((reg: any) => reg.status === 'checked').length);
    } catch (err) {
      console.error(err);
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
  const navigateToRejected = () => {
    router.push("/rejected");
  };
  const navigateToChecked = () => {
    router.push("/checkedRegistration");
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
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.title}>Đơn Đăng Ký</Text>
            <Text style={styles.subtitle}>Quản lý các đơn đăng ký thi đấu</Text>
          </View>
          <View style={styles.totalRegistrations}>
            <Text style={styles.totalNumber}>
              {pendingCount + approvedCount + rejectedCount + checkedCount}
            </Text>
            <Text style={styles.totalLabel}>Tổng đơn</Text>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.statusContainer}
          contentContainerStyle={styles.statusContentContainer}
        >
          <TouchableOpacity 
            style={styles.statusItem} 
            onPress={navigateToWaittingApproval}
          >
            <View style={[styles.card, styles.pendingCard]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, styles.pendingIcon]}>
                  <AntDesign name="filetext1" size={24} color="#F59E0B" />
                </View>
                {pendingCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{pendingCount}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardTitle}>Chờ Duyệt</Text>
              <Text style={styles.cardSubtitle}>Đơn đang chờ xét duyệt</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statusItem} 
            onPress={navigateToApprove}
          >
            <View style={[styles.card, styles.approvedCard]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, styles.approvedIcon]}>
                  <AntDesign name="checkcircleo" size={24} color="#10B981" />
                </View>
                {approvedCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{approvedCount}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardTitle}>Đã Duyệt</Text>
              <Text style={styles.cardSubtitle}>Đơn được chấp nhận</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statusItem} 
            onPress={navigateToRejected}
          >
            <View style={[styles.card, styles.rejectedCard]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, styles.rejectedIcon]}>
                  <AntDesign name="closecircleo" size={24} color="#EF4444" />
                </View>
                {rejectedCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{rejectedCount}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardTitle}>Từ Chối</Text>
              <Text style={styles.cardSubtitle}>Đơn bị từ chối</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.statusItem} 
            onPress={navigateToChecked}
          >
            <View style={[styles.card, styles.checkedCard]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, styles.checkedIcon]}>
                  <AntDesign name="staro" size={24} color="#6366F1" />
                </View>
                {checkedCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{checkedCount}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardTitle}>Kiểm Tra</Text>
              <Text style={styles.cardSubtitle}>Duyệt trước thi</Text>
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
    marginHorizontal: -20,
  },
  statusItem: {
    marginRight: 16,
  },
  card: {
    width: 160,
    height: 140,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  totalRegistrations: {
    alignItems: 'center',
  },
  totalNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  totalLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statusContentContainer: {
    paddingHorizontal: 20,
  },
  pendingCard: {
    backgroundColor: '#FEF3C7',
  },
  pendingIcon: {
    backgroundColor: '#FDE68A',
  },
  approvedCard: {
    backgroundColor: '#D1FAE5',
  },
  approvedIcon: {
    backgroundColor: '#A7F3D0',
  },
  rejectedCard: {
    backgroundColor: '#FEE2E2',
  },
  rejectedIcon: {
    backgroundColor: '#FECACA',
  },
  checkedCard: {
    backgroundColor: '#E0E7FF',
  },
  checkedIcon: {
    backgroundColor: '#C7D2FE',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 12,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
});