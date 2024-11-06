import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { getAllRegistrations, updateRegistrationStatus } from '../../../../api/registrationAPI';
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';

interface Registration {
  _id: string;
  status: 'pending' | 'approved' | 'rejected';
  contestSubCategory: {
    _id: string;
    name: string;
    description: string;
  };
  fish: {
    name: string;
    length: number;
    weight: number;
    images: string[];
  };
}

const SubContestDetailPage = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await getAllRegistrations();
        const filteredRegistrations = data.filter(
          (reg: any) => reg.contestSubCategory._id === id
        );
        setRegistrations(filteredRegistrations);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [id]);

  const handleStatusUpdate = async (registrationId: string, status: 'approved' | 'rejected') => {
    try {
      setUpdatingId(registrationId);
      await updateRegistrationStatus(registrationId, status);
      
      setRegistrations(prevRegistrations => 
        prevRegistrations.map(reg => 
          reg._id === registrationId ? { ...reg, status } : reg
        )
      );

      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: `Đã ${status === 'approved' ? 'duyệt' : 'từ chối'} đăng ký`,
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 60
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể cập nhật trạng thái. Vui lòng thử lại',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return { bg: '#e7f5e9', text: '#4CAF50' };
      case 'rejected':
        return { bg: '#ffebee', text: '#f44336' };
      default:
        return { bg: '#fff3e0', text: '#ff9800' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return 'Chờ duyệt';
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#f45124" />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['#f45124', '#f48516']}
          style={styles.header}
        >
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết hạng mục</Text>
        </LinearGradient>

        {registrations.length > 0 && (
          <View style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>
                {registrations[0].contestSubCategory.name}
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {registrations.length} đăng ký
                </Text>
              </View>
            </View>
            <Text style={styles.categoryDescription}>
              {registrations[0].contestSubCategory.description}
            </Text>
          </View>
        )}

        <View style={styles.fishList}>
          {registrations.map((reg) => (
            <Animated.View key={reg._id} style={[styles.fishCard]}>
              <Image 
                source={{ uri: reg.fish.images[0] }} 
                style={styles.fishImage}
              />
              <View style={styles.fishInfo}>
                <View style={styles.fishHeader}>
                  <Text style={styles.fishName}>{reg.fish.name}</Text>
                  <View style={[
                    styles.statusBadge, 
                    { backgroundColor: getStatusColor(reg.status).bg }
                  ]}>
                    <Text style={[
                      styles.statusText, 
                      { color: getStatusColor(reg.status).text }
                    ]}>
                      {getStatusText(reg.status)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.fishDetails}>
                  Dài: {reg.fish.length}cm | Nặng: {reg.fish.weight}kg
                </Text>
              </View>

              <View style={styles.actionButtons}>
                {updatingId === reg._id ? (
                  <ActivityIndicator color="#f45124" />
                ) : (
                  <>
                    {reg.status === 'pending' ? (
                      <>
                        <TouchableOpacity
                          style={[styles.actionButton, styles.approveButton]}
                          onPress={() => handleStatusUpdate(reg._id, 'approved')}
                        >
                          <Text style={styles.buttonText}>Duyệt</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                          style={[styles.actionButton, styles.rejectButton]}
                          onPress={() => handleStatusUpdate(reg._id, 'rejected')}
                        >
                          <Text style={styles.buttonText}>Từ chối</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <Text style={styles.handledText}>
                        {reg.status === 'approved' ? 'Đã duyệt' : 'Đã từ chối'}
                      </Text>
                    )}
                  </>
                )}
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
    elevation: 4,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  categoryCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  categoryDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  badge: {
    backgroundColor: '#f45124',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  fishList: {
    padding: 16,
  },
  fishCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  fishImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  fishInfo: {
    padding: 16,
  },
  fishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  fishDetails: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  fishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  handledText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default SubContestDetailPage; 