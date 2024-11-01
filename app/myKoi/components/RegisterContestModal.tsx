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
import { Picker } from '@react-native-picker/picker';
import { assignToContest } from '../../../api/registrationAPI';
import { getAllContestInstances } from '../../../api/competitionApi';

interface RegisterContestModalProps {
  visible: boolean;
  onClose: () => void;
  fishId: string;
}

interface ContestInstance {
  id: string;
  name: string;
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

  useEffect(() => {
    fetchContests();
  }, []);

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

  const handleSubmit = async () => {
    try {
      if (!selectedContest || !selectedCategory) {
        throw new Error('Please select both contest and category');
      }

      setLoading(true);
      setError(null);

      await assignToContest(fishId, selectedContest, selectedCategory);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to register for contest');
    } finally {
      setLoading(false);
    }
  };

  const selectedContestData = contests.find(c => c.id === selectedContest);

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
            )}

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Đăng Ký</Text>
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
