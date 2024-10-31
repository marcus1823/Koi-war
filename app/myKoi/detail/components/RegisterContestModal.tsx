import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { assignToContest } from '../../../../api/registrationAPI';
import { getAllContestInstances } from '../../../../api/competitionApi';

interface RegisterContestModalProps {
  visible: boolean;
  onClose: () => void;
  fishId: string;
}

export default function RegisterContestModal({ visible, onClose, fishId }: RegisterContestModalProps) {
  const [contests, setContests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const data = await getAllContestInstances();
      const activeContests = data.filter((contest: any) => contest.isActive);
      setContests(activeContests);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (contestId: string, subCategoryId: string) => {
    try {
      setRegistering(true);
      await assignToContest(fishId, contestId, subCategoryId);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#eb7452" />
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Đăng Ký Cuộc Thi</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Lỗi: {error}</Text>
            </View>
          )}

          <ScrollView style={styles.contestList}>
            {contests.map((contest) => (
              <View key={contest._id} style={styles.contestItem}>
                <Text style={styles.contestName}>{contest.contest.name}</Text>
                <View style={styles.subCategories}>
                  {contest.contestSubCategories.map((subCategory: any) => (
                    <TouchableOpacity
                      key={subCategory._id}
                      style={[
                        styles.subCategoryButton,
                        selectedSubCategory === subCategory._id && styles.selectedSubCategory,
                      ]}
                      onPress={() => setSelectedSubCategory(subCategory._id)}
                    >
                      <Text 
                        style={[
                          styles.subCategoryText,
                          selectedSubCategory === subCategory._id && styles.selectedSubCategoryText,
                        ]}
                      >
                        {subCategory.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity
                  style={[
                    styles.registerButton,
                    (!selectedSubCategory || registering) && styles.disabledButton,
                  ]}
                  onPress={() => handleRegister(contest._id, selectedSubCategory!)}
                  disabled={!selectedSubCategory || registering}
                >
                  {registering ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.registerButtonText}>Đăng Ký</Text>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 34,
    maxHeight: '80%',
    minHeight: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  contestList: {
    marginTop: 15,
  },
  contestItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  contestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  subCategoryButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  selectedSubCategory: {
    backgroundColor: '#eb7452',
  },
  subCategoryText: {
    color: '#666',
    fontSize: 14,
  },
  selectedSubCategoryText: {
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#eb7452',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
}); 