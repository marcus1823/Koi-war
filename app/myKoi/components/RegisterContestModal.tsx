import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { assignToContest, getContestsByFishId } from '../../../api/registrationAPI';
import { getAllContestInstances } from '../../../api/competitionApi';

interface RegisterContestModalProps {
  visible: boolean;
  onClose: () => void;
  fishId: string;
}

interface ContestInstance {
  id: string;
  name: string;
  rules: string;
  contestSubCategories: {
    id: string;
    name: string;
  }[];
}

export default function RegisterContestModal({ visible, onClose, fishId }: RegisterContestModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contests, setContests] = useState<ContestInstance[]>([]);
  const [selectedContest, setSelectedContest] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentRegistration, setCurrentRegistration] = useState<{ contestId: string, categoryId: string } | null>(null);
  const [isQualified, setIsQualified] = useState(false);

  useEffect(() => {
    fetchContests();
    fetchCurrentRegistration();
  }, []);

  useEffect(() => {
    checkQualification();
  }, [selectedContest, selectedCategory]);

  const fetchContests = async () => {
    try {
      const data = await getAllContestInstances();
      const activeContests = data.filter((contest: any) => contest.isActive);
      setContests(activeContests);
    } catch (err: any) {
      setError('Failed to load contests');
      console.error('Error fetching contests:', err);
    }
  };

  const fetchCurrentRegistration = async () => {
    try {
      const registrationData = await getContestsByFishId(fishId);
      if (registrationData && registrationData.contestSubCategory) {
        setCurrentRegistration({
          contestId: registrationData.contestSubCategory.contestInstance,
          categoryId: registrationData.contestSubCategory.id,
        });
      }
    } catch (err: any) {
      console.error('Error fetching current registration:', err);
    }
  };

  const checkQualification = () => {
    if (selectedContest && selectedCategory) {
      setIsQualified(true);
    } else {
      setIsQualified(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedContest || !selectedCategory) {
        throw new Error('Vui lòng chọn cuộc thi và hạng mục');
      }

      setLoading(true);
      setError(null);

      await assignToContest(fishId, selectedContest, selectedCategory);
      
      Alert.alert(
        "Đăng Ký Thành Công",
        "Cá của bạn đã được đăng ký tham gia cuộc thi thành công!",
        [
          {
            text: "OK",
            onPress: () => {
              onClose();
              fetchCurrentRegistration();
            }
          }
        ]
      );
    } catch (err: any) {
      Alert.alert(
        "Đăng Ký Thất Bại",
        err.message || "Có lỗi xảy ra khi đăng ký cuộc thi. Vui lòng thử lại sau.",
        [
          {
            text: "OK",
            style: "cancel"
          }
        ]
      );
      setError(err.message || 'Đăng ký cuộc thi thất bại');
    } finally {
      setLoading(false);
    }
  };

  const validateSubmission = () => {
    if (!selectedContest) {
      Alert.alert(
        "Thông Báo",
        "Vui lòng chọn cuộc thi",
        [{ text: "OK", style: "cancel" }]
      );
      return false;
    }
    if (!selectedCategory) {
      Alert.alert(
        "Thông Báo",
        "Vui lòng chọn hạng mục",
        [{ text: "OK", style: "cancel" }]
      );
      return false;
    }
    return true;
  };

  const onSubmitPress = () => {
    if (validateSubmission()) {
      handleSubmit();
    }
  };

  const selectedContestData = contests.find(c => c.id === selectedContest);
  const isAlreadyRegistered = currentRegistration && selectedContest === currentRegistration.contestId && selectedCategory === currentRegistration.categoryId;
  const isButtonDisabled = loading || !isQualified || isAlreadyRegistered;

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

          <ScrollView style={styles.form}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cuộc Thi</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedContest}
                  onValueChange={setSelectedContest}
                  style={styles.picker}
                >
                  <Picker.Item label="Chọn cuộc thi..." value="" />
                  {contests.map((contest) => (
                    <Picker.Item 
                      key={contest.id} 
                      label={contest.name} 
                      value={contest.id} 
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {selectedContestData && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Hạng Mục</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedCategory}
                      onValueChange={setSelectedCategory}
                      style={styles.picker}
                    >
                      <Picker.Item label="Chọn hạng mục..." value="" />
                      {selectedContestData.contestSubCategories.map((category) => (
                        <Picker.Item 
                          key={category.id} 
                          label={category.name} 
                          value={category.id} 
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={styles.rulesContainer}>
                  <Text style={styles.rulesLabel}>Quy Tắc Cuộc Thi</Text>
                  <Text style={styles.rulesText}>{selectedContestData.rules}</Text>
                </View>
              </>
            )}

            <TouchableOpacity
              style={[styles.submitButton, isButtonDisabled && styles.disabledButton]}
              onPress={onSubmitPress}
              disabled={!!isButtonDisabled}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {isAlreadyRegistered ? 'Đã Đăng Ký' : 'Đăng Ký'}
                </Text>
              )}
            </TouchableOpacity>
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
    maxHeight: '90%',
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
  form: {
    marginTop: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  rulesContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  rulesLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rulesText: {
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#eb7452',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
});
