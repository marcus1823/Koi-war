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
import { getContestsByFishId } from '../../../api/registrationAPI';
import RegisterContestModal from '../components/RegisterContestModal';
import { getContestInstanceById } from '../../../api/competitionApi';

const { width } = Dimensions.get('window');

export default function FishDetailPage() {
  const { id } = useLocalSearchParams();
  const [fish, setFish] = useState<KoiFish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('info');
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [contestRegistration, setContestRegistration] = useState<any>(null);

  useEffect(() => {
    const fetchFishDetail = async () => {
      if (!id) {
        setError('Invalid fish ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getFishDetail(id as string);
        if (!response || !response.name) {
          throw new Error('Invalid fish data received');
        }
        setFish(response);
      } catch (err: any) {
        setError(err.message || 'Error loading fish details');
        console.error('Fish detail error:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchContestRegistration = async () => {
      try {
        const registrationData = await getContestsByFishId(id as string);
        
        if (registrationData && registrationData.contestSubCategory) {
          const contestInstanceId = registrationData.contestSubCategory.contestInstance;
          const contestInstanceData = await getContestInstanceById(contestInstanceId);

          const combinedData = {
            ...registrationData,
            contestInstance: contestInstanceData,
          };

          setContestRegistration(combinedData);
        }
      } catch (err) {
        console.error('Error fetching contest registration:', err);
      }
    };

    fetchFishDetail();
    fetchContestRegistration();
  }, [id]);

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
          <Text style={styles.errorText}>Error: {error || 'Fish not found'}</Text>
        </View>
      );
    }

    return (
      <>
        <Stack.Screen
          options={{
            title: fish?.name || 'Fish Details',
            headerShown: true,
          }}
        />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            {fish.images && fish.images.length > 0 ? (
              <Image
                source={{ uri: fish.images[0] }}
                style={styles.mainImage}
              />
            ) : (
              <Text style={styles.errorText}>No image available</Text>
            )}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.gradient}
            />
            <View style={styles.imageOverlay}>
              <View style={styles.varietyBadge}>
                <Text style={styles.varietyText}>
                  {fish?.variety?.name || 'Unknown Variety'}
                </Text>
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
                  <Text style={styles.description}>
                    {fish.variety?.description || 'Không có thông tin chi tiết'}
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.section}>
                {contestRegistration ? (
                  <>
                    <View style={styles.contestCard}>
                      <View style={styles.contestHeader}>
                        <MaterialCommunityIcons name="trophy-award" size={24} color="#eb7452" />
                        <View style={styles.contestTitleContainer}>
                          <Text style={styles.mainContestTitle}>
                            {contestRegistration.contestInstance.data.contest.name}
                          </Text>
                          <Text style={styles.contestTitle}>
                            {contestRegistration.contestSubCategory.name}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={styles.contestDetails}>
                        <View style={styles.detailRow}>
                          <MaterialCommunityIcons name="information" size={20} color="#666" />
                          <Text style={styles.detailText}>
                            {contestRegistration.contestInstance.data.description}
                          </Text>
                        </View>

                        <View style={styles.detailRow}>
                          <MaterialCommunityIcons name="gavel" size={20} color="#666" />
                          <Text style={styles.detailText}>
                            {contestRegistration.contestInstance.data.rules}
                          </Text>
                        </View>

                        <View style={styles.categoryDetail}>
                          <Text style={styles.categoryDescription}>
                            {contestRegistration.contestSubCategory.description}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={styles.contestInfo}>
                        <View style={styles.statusRow}>
                          <View style={[
                            styles.statusBadge,
                            contestRegistration?.status === 'pending' ? styles.pendingBadge : styles.approvedBadge
                          ]}>
                            <View style={[
                              styles.statusDot,
                              contestRegistration?.status === 'pending' ? styles.pendingDot : styles.approvedDot
                            ]} />
                            <Text style={[
                              styles.statusText,
                              contestRegistration?.status === 'pending' ? styles.pendingText : styles.approvedText
                            ]}>
                              {contestRegistration?.status === 'pending' ? 'Đang chờ duyệt' : 'Đã duyệt'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    {contestRegistration.scores && contestRegistration.scores.length > 0 && (
                      <View style={styles.scoresContainer}>
                        <View style={styles.scoreHeader}>
                          <FontAwesome5 name="star" size={20} color="#eb7452" />
                          <Text style={styles.sectionTitle}>Điểm số</Text>
                        </View>
                      </View>
                    )}
                  </>
                ) : (
                  <Text style={styles.description}>Chưa đăng ký cuộc thi nào</Text>
                )}
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
      height: width * 0.6,
      marginBottom: 0,
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
      height: '70%',
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
      backgroundColor: 'rgba(235, 116, 82, 0.95)',
      paddingHorizontal: 15,
      paddingVertical: 8,
      marginBottom: 10,
      borderRadius: 25,
      alignSelf: 'flex-start',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    varietyText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '600',
    },
    contentContainer: {
      padding: 20,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: '#fff',
      marginTop: -20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
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
      marginBottom: 25,
      backgroundColor: '#f8f8f8',
      borderRadius: 15,
      padding: 15,
    },
    statBox: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderRightWidth: 1,
      borderRightColor: '#eee',
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
      padding: 18,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 20,
      marginHorizontal: 20,
      marginBottom: 20,
      shadowColor: '#eb7452',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 4,
    },
    registerButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    contestCard: {
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
      borderWidth: 1,
      borderColor: '#f0f0f0',
    },
    contestHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    contestTitleContainer: {
      flex: 1,
      marginLeft: 10,
    },
    mainContestTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginRight: 10,
    },
    contestTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginLeft: 10,
    },
    contestInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 5,
    },
    statusText: {
      fontSize: 14,
      fontWeight: '500',
    },
    pendingBadge: {
      backgroundColor: 'rgba(255, 160, 0, 0.1)',
    },
    approvedBadge: {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
    },
    pendingDot: {
      backgroundColor: '#FFA000',
    },
    approvedDot: {
      backgroundColor: '#4CAF50',
    },
    pendingText: {
      color: '#FFA000',
    },
    approvedText: {
      color: '#4CAF50',
    },
    scoresContainer: {
      marginTop: 15,
    },
    scoreHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
      gap: 8,
    },
    contestDetails: {
      marginTop: 10,
      marginBottom: 15,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
      paddingRight: 10,
    },
    detailText: {
      fontSize: 14,
      color: '#666',
      marginLeft: 10,
      flex: 1,
      lineHeight: 20,
    },
    categoryDetail: {
      backgroundColor: '#f8f8f8',
      padding: 12,
      borderRadius: 8,
      marginTop: 5,
    },
    categoryDescription: {
      fontSize: 14,
      color: '#666',
      fontStyle: 'italic',
    },
  });