import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface CreateContestModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (contestData: { name: string; description: string }) => Promise<boolean>;
  initialData?: { name: string; description: string };
  isUpdate?: boolean;
}

export const CreateContestModal: React.FC<CreateContestModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  isUpdate = false
}) => {
  const [contestData, setContestData] = useState({ name: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setContestData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!contestData.name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên cuộc thi');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await onSubmit(contestData);
      if (success) {
        Alert.alert(
          'Thành công',
          isUpdate ? 'Cập nhật cuộc thi thành công' : 'Tạo mới cuộc thi thành công'
        );
        setContestData({ name: '', description: '' });
        onClose();
      }
    } catch (error) {
      Alert.alert(
        'Lỗi',
        isUpdate ? 'Không thể cập nhật cuộc thi' : 'Không thể tạo cuộc thi mới'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {isUpdate ? 'Cập nhật Cuộc thi' : 'Tạo mới Cuộc thi'}
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Tên cuộc thi"
            value={contestData.name}
            onChangeText={text => setContestData(prev => ({ ...prev, name: text }))}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Mô tả"
            multiline
            value={contestData.description}
            onChangeText={text => setContestData(prev => ({ ...prev, description: text }))}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.primaryButton,
                isSubmitting && styles.disabledButton
              ]} 
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting 
                  ? 'Đang xử lý...' 
                  : isUpdate ? 'Cập nhật' : 'Tạo mới'
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5'
  },
  primaryButton: {
    backgroundColor: '#007AFF'
  },
  disabledButton: {
    backgroundColor: '#99c4ea',
  },
  buttonText: {
    color: '#fff'
  }
});