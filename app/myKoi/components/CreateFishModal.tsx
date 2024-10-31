import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createFish } from '../../../api/koi/myKoiApi';
import { getAllVariety, Variety } from '../../../api/varietyApi';
import { Picker } from '@react-native-picker/picker';

interface CreateFishModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateFishModal({ visible, onClose, onSuccess }: CreateFishModalProps) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [description, setDescription] = useState('');
  const [variety, setVariety] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [weightError, setWeightError] = useState<string | null>(null);
  const [lengthError, setLengthError] = useState<string | null>(null);

  useEffect(() => {
    fetchVarieties();
  }, []);

  const fetchVarieties = async () => {
    try {
      const data = await getAllVariety();
      setVarieties(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const addImageUrl = () => {
    if (imageUrl.trim()) {
      try {
        new URL(imageUrl.trim());
        setImages([...images, imageUrl.trim()]);
        setImageUrl('');
      } catch (e) {
        setError('URL hình ảnh không hợp lệ');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!name || !variety || images.length === 0) {
        throw new Error('Vui lòng điền đầy đủ thông tin');
      }

      const weightNum = parseFloat(weight);
      if (isNaN(weightNum) || weightNum <= 0.1) {
        setWeightError('Cân nặng phải lớn hơn 0.1');
        return;
      }

      const lengthNum = parseFloat(length);
      if (isNaN(lengthNum) || lengthNum <= 1) {
        setLengthError('Chiều dài phải lớn hơn 1');
        return;
      }

      for (const url of images) {
        try {
          new URL(url);
        } catch (e) {
          throw new Error('Một hoặc nhiều URL hình ảnh không hợp lệ');
        }
      }

      const fishData = {
        name: name.trim(),
        weight: weightNum,
        length: lengthNum,
        variety,
        images,
        description: description.trim()
      };
      console.log(fishData);

      try {
        await createFish(fishData);
        onSuccess();
        onClose();
        resetForm();
      } catch (err: any) {
        if (err.response) {
          switch (err.response.status) {
            case 404:
              throw new Error('API endpoint không tồn tại. Vui lòng kiểm tra lại cấu hình.');
            case 400:
              throw new Error(err.response.data.message || 'Dữ liệu không hợp lệ');
            case 401:
              throw new Error('Bạn cần đăng nhập để thực hiện thao tác này');
            default:
              throw new Error('Có lỗi xảy ra khi tạo cá. Vui lòng thử lại sau.');
          }
        } else if (err.request) {
          throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
        } else {
          throw err;
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setWeight('');
    setLength('');
    setDescription('');
    setVariety('');
    setImages([]);
    setError(null);
  };

  const validateWeight = (text: string) => {
    const num = parseFloat(text);
    setWeightError(isNaN(num) || num <= 0.1 ? 'Cân nặng phải lớn hơn 0.1' : null);
  };

  const validateLength = (text: string) => {
    const num = parseFloat(text);
    setLengthError(isNaN(num) || num <= 1 ? 'Chiều dài phải lớn hơn 1' : null);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Thêm Cá Koi Mới</Text>
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
              <Text style={styles.label}>Tên Cá</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nhập tên cá..."
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Cân Nặng (kg)</Text>
                <TextInput
                  style={[styles.input, weightError ? styles.inputError : null]}
                  value={weight}
                  onChangeText={(text) => {
                    setWeight(text);
                    validateWeight(text);
                  }}
                  keyboardType="numeric"
                  placeholder="0.0"
                />
                {weightError && <Text style={styles.errorText}>{weightError}</Text>}
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Chiều Dài (cm)</Text>
                <TextInput
                  style={[styles.input, lengthError ? styles.inputError : null]}
                  value={length}
                  onChangeText={(text) => {
                    setLength(text);
                    validateLength(text);
                  }}
                  keyboardType="numeric"
                  placeholder="0.0"
                />
                {lengthError && <Text style={styles.errorText}>{lengthError}</Text>}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Giống</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={variety}
                  onValueChange={(itemValue) => setVariety(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Chọn giống cá..." value="" />
                  {varieties.map((v) => (
                    <Picker.Item key={v._id} label={v.name} value={v._id} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mô Tả</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Nhập mô tả..."
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.imageSection}>
              <Text style={styles.label}>Hình Ảnh</Text>
              <View style={styles.imageInputContainer}>
                <TextInput
                  style={[styles.input, { flex: 1, marginRight: 10 }]}
                  value={imageUrl}
                  onChangeText={setImageUrl}
                  placeholder="Nhập đường dẫn hình ảnh..."
                />
                <TouchableOpacity 
                  style={[styles.addUrlButton, !imageUrl.trim() && styles.disabledButton]}
                  onPress={addImageUrl}
                  disabled={!imageUrl.trim()}
                >
                  <Text style={styles.addUrlButtonText}>Thêm</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageList}>
                {images.map((uri, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri }} style={styles.imagePreview} />
                    <TouchableOpacity 
                      style={styles.removeImageButton}
                      onPress={() => setImages(images.filter((_, i) => i !== index))}
                    >
                      <Ionicons name="close-circle" size={24} color="#eb7452" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Thêm Cá Koi</Text>
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
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageSection: {
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  addImageButton: {
    width: 100,
    height: 100,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  submitButton: {
    backgroundColor: '#eb7452',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
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
  imageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addUrlButton: {
    backgroundColor: '#eb7452',
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  addUrlButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  imageList: {
    marginTop: 10,
  },
  imageContainer: {
    marginRight: 10,
    position: 'relative',
  },
  removeImageButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 12,
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
  inputError: {
    borderColor: '#c62828',
    borderWidth: 1,
  },
}); 