import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { KoiFish, getFishDetail } from '../../../api/koi/myKoiApi';
import RegisterContestModal from '../components/RegisterContestModal';

const { width } = Dimensions.get('window');

export default function FishDetailPage() {
  const { id } = useLocalSearchParams();
  const [fish, setFish] = useState<KoiFish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('info');
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  useEffect(() => {
    fetchFishDetail();
  }, [id]);

  const fetchFishDetail = async () => {
    try {
      const data = await getFishDetail(id as string);
      setFish(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#eb7452" />
      </View>
    );
  }

  if (error || !fish) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Lỗi: {error || 'Không tìm thấy cá'}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: fish.name,
          headerShown: true,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: fish.images[0] }}
            style={styles.mainImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />
          <View style={styles.imageOverlay}>
            <View style={styles.varietyBadge}>
              <Text style={styles.varietyText}>{fish.variety.name}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'info' && styles.activeTab]}
              onPress={() => setActiveTab('info')}
            >
              <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>
                Thông Tin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'contests' && styles.activeTab]}
              onPress={() => setActiveTab('contests')}
            >
              <Text style={[styles.tabText, activeTab === 'contests' && styles.activeTabText]}>
                Cuộc Thi
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'info' ? (
            <>
              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <MaterialCommunityIcons name="weight" size={24} color="#eb7452" />
                  <Text style={styles.statValue}>{fish.weight} kg</Text>
                  <Text style={styles.statLabel}>Cân Nặng</Text>
                </View>
                <View style={styles.statBox}>
                  <MaterialCommunityIcons name="ruler" size={24} color="#eb7452" />
                  <Text style={styles.statValue}>{fish.length} cm</Text>
                  <Text style={styles.statLabel}>Chiều Dài</Text>
                </View>
                <View style={styles.statBox}>
                  <FontAwesome5 name="trophy" size={24} color="#eb7452" />
                  <Text style={styles.statValue}>3</Text>
                  <Text style={styles.statLabel}>Giải Thưởng</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mô Tả</Text>
                <Text style={styles.description}>{fish.description}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Chi Tiết Giống</Text>
                <Text style={styles.description}>{fish.variety.description}</Text>
              </View>
            </>
          ) : (
            <View style={styles.section}>
              <Text style={styles.description}>Lịch sử cuộc thi sẽ được cập nhật sớm...</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.registerButton}
        onPress={() => setRegisterModalVisible(true)}
      >
        <Text style={styles.registerButtonText}>Đăng Ký Cuộc Thi</Text>
      </TouchableOpacity>

      <RegisterContestModal
        visible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
        fishId={id as string}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: width * 0.5,
    marginBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 15,
  },
  varietyBadge: {
    backgroundColor: 'rgba(235, 116, 82, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  varietyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    color: '#eb7452',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#eb7452',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#eb7452',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#eb7452',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#666',
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#eb7452',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#eb7452',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
