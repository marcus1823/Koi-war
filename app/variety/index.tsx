import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { getAllVariety } from '../../api/varietyApi';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type Variety = {
  _id: string;
  name: string;
  description: string;
  images?: string[];
};

export default function VarietyPage() {
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVarieties();
  }, []);

  const fetchVarieties = async () => {
    try {
      const data = await getAllVariety();
      setVarieties(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Variety }) => (
    <TouchableOpacity style={styles.varietyCard}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.images?.[0] || 'https://placeholder-url.com/default-image.jpg' }} 
          style={styles.varietyImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        />
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <MaterialIcons name="verified" size={16} color="#fff" />
            <Text style={styles.badgeText}>Premium</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.varietyInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.varietyName}>{item.name}</Text>
          <MaterialIcons name="arrow-forward-ios" size={20} color="#666" />
        </View>
        
        <Text style={styles.varietyDescription} numberOfLines={3}>
          {item.description}
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.statText}>4.8</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={16} color="#666" />
            <Text style={styles.statText}>2.1k views</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading varieties...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Giống Cá Koi",
          headerShown: true,
        }} 
      />
      <LinearGradient
        colors={["#eb7452", "#5C98BB"]}
        style={styles.container}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>KHÁM PHÁ</Text>
          <Text style={styles.headerSubtitle}>Các Giống Cá Koi</Text>
        </View>

        <FlatList
          data={varieties}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -1,
  },
  headerSubtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -1,
  },
  listContent: {
    padding: 20,
  },
  varietyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  varietyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(235, 116, 82, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  varietyInfo: {
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  varietyName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  varietyDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#ddd',
    marginHorizontal: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
  },
});
