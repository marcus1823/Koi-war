import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ContestInstanceFormData {
  name: string;
  description: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  rules: string;
}


interface ContestInstanceModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: ContestInstanceFormData) => Promise<boolean>;
  initialData?: ContestInstanceFormData;
  isUpdate?: boolean;
}

export const ContestInstanceModal = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  isUpdate,
}: ContestInstanceModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rules, setRules] = useState("");
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setImageUrl(initialData.imageUrl);
      setStartDate(new Date(initialData.startDate));
      setEndDate(new Date(initialData.endDate));
      setRules(initialData.rules);
    } else {
      resetForm();
    }
  }, [initialData, visible]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setImageUrl("");
    setStartDate(new Date());
    setEndDate(new Date());
    setRules("");
    setError("");
  };

  const validateForm = () => {
    if (!name.trim()) {
      setError("Vui lòng nhập tên đợt thi");
      return false;
    }
    if (!description.trim()) {
      setError("Vui lòng nhập mô tả");
      return false;
    }
    if (!imageUrl.trim()) {
      setError("Vui lòng nhập URL hình ảnh");
      return false;
    }
    if (!rules.trim()) {
      setError("Vui lòng nhập luật thi");
      return false;
    }
    if (endDate <= startDate) {
      setError("Ngày kết thúc phải sau ngày bắt đầu");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const success = await onSubmit({
      name,
      description,
      imageUrl,
      startDate,
      endDate,
      rules,
    });

    if (success) {
      resetForm();
      onClose();
    }
  };

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    isStart: boolean
  ) => {
    if (Platform.OS === "android") {
      setShowStartPicker(false);
      setShowEndPicker(false);
    }

    if (selectedDate) {
      if (isStart) {
        setStartDate(selectedDate);
        // Automatically set end date to start date + 1 day if end date is before start date
        if (endDate <= selectedDate) {
          const newEndDate = new Date(selectedDate);
          newEndDate.setDate(newEndDate.getDate() + 1);
          setEndDate(newEndDate);
        }
      } else {
        setEndDate(selectedDate);
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>
              {isUpdate ? "Cập nhật Đợt thi" : "Tạo Đợt thi Mới"}
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Text style={styles.label}>Tên đợt thi <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nhập tên đợt thi"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Mô tả <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Nhập mô tả"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.label}>URL Hình ảnh <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="Nhập URL hình ảnh"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Ngày bắt đầu <Text style={styles.required}>*</Text></Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowStartPicker(true)}
            >
              <Text style={styles.dateButtonText}>{formatDate(startDate)}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Ngày kết thúc <Text style={styles.required}>*</Text></Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowEndPicker(true)}
            >
              <Text style={styles.dateButtonText}>{formatDate(endDate)}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Luật thi <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={rules}
              onChangeText={setRules}
              placeholder="Nhập luật thi"
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
            />

            {(showStartPicker || showEndPicker) && (
              <DateTimePicker
                value={showStartPicker ? startDate : endDate}
                mode="date"
                display="default"
                onChange={(event, date) =>
                  handleDateChange(event, date, showStartPicker)
                }
                minimumDate={showStartPicker ? new Date() : startDate}
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>
                  {isUpdate ? "Cập nhật" : "Tạo mới"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "#FF3B30",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  submitButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
});

export default ContestInstanceModal;