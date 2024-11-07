import { ContestModalProps } from '@/models/types';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const ContestModal: React.FC<ContestModalProps> = ({
  visible,
  contestInstances = [],
  selectedInstance,
  subCategories = [],
  selectedSubCategory,
  onInstanceSelect,
  onSubCategorySelect,
  onClose,
  onSubmit
}) => {
  const safeContestInstances = Array.isArray(contestInstances) ? contestInstances : [];
  const safeSubCategories = Array.isArray(subCategories) ? subCategories : [];

  const handleSubmit = () => {
    if (selectedInstance && selectedSubCategory) {
      onSubmit();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chọn đợt thi</Text>
          
          <Picker
            selectedValue={selectedInstance}
            style={styles.picker}
            onValueChange={(value: number) => onInstanceSelect(value)}
          >
            <Picker.Item label="Chọn đợt thi" value={null} />
            {safeContestInstances.map((instance) => (
              <Picker.Item 
                key={instance.id} 
                label={instance.name} 
                value={instance.id} 
              />
            ))}
          </Picker>

          <Text style={styles.modalTitle}>Chọn hạng mục</Text>
          <Picker
            selectedValue={selectedSubCategory}
            style={styles.picker}
            onValueChange={(value: number) => onSubCategorySelect(value)}
            enabled={!!selectedInstance}
          >
            <Picker.Item label="Chọn hạng mục" value={null} />
            {safeSubCategories.map((category) => (
              <Picker.Item 
                key={category.id} 
                label={category.name} 
                value={category.id} 
              />
            ))}
          </Picker>

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.modalButton, 
                styles.modalButtonPrimary,
                (!selectedInstance || !selectedSubCategory) && styles.modalButtonDisabled
              ]} 
              onPress={handleSubmit}
              disabled={!selectedInstance || !selectedSubCategory}
            >
              <Text style={styles.modalButtonText}>Chọn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 100,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: '#666',
  },
  modalButtonPrimary: {
    backgroundColor: '#007AFF',
  },
  modalButtonDisabled: {
    opacity: 0.5,
  },
  modalButtonText: {
    color: '#fff',
  },
});

export default ContestModal;
