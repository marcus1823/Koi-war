import React, { useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface SubCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (subCategory: {
    name: string;
    description: string;
  }) => void;
  initialData?: {
    name: string;
    description: string;
  };
  mode: 'create' | 'edit';
}

export const SubCategoryModal: React.FC<SubCategoryModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  mode,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({ name, description });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {mode === 'create' ? 'Thêm Hạng Mục' : 'Chỉnh Sửa Hạng Mục'}
          </Text>

          <Text style={styles.label}>Tên Hạng Mục</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Nhập tên hạng mục"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Mô Tả</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Nhập mô tả"
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>
                {mode === 'create' ? 'Thêm' : 'Lưu'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#ff3333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: '#1E90FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
