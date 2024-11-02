import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface ContestInstanceModal {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        startDate: string;
        endDate: string;
        description: string;
        rules: string;
        images: string;
    }) => Promise<void>;
}

export const CreateContestInstanceModal: React.FC<ContestInstanceModal> = ({
    visible,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        description: '',
        rules: '',
        images: '',
    });
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartDatePicker(false);
        if (selectedDate) {
            setFormData(prev => ({ ...prev, startDate: selectedDate }));
        }
    };

    const handleEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndDatePicker(false);
        if (selectedDate) {
            setFormData(prev => ({ ...prev, endDate: selectedDate }));
        }
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên đợt thi đấu');
            return false;
        }

        if (formData.endDate < formData.startDate) {
            Alert.alert('Lỗi', 'Ngày kết thúc phải sau ngày bắt đầu');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await onSubmit({
                ...formData,
                startDate: formData.startDate.toISOString(),
                endDate: formData.endDate.toISOString(),
            });
            setFormData({
                name: '',
                startDate: new Date(),
                endDate: new Date(),
                description: '',
                rules: '',
                images: '',
            });
            onClose();
        } catch (error) {
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi tạo đợt thi đấu');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderDatePicker = (
        isStartDate: boolean,
        show: boolean,
        onChange: (event: any, date?: Date) => void
    ) => {
        if (!show) return null;

        return (
            <DateTimePicker
                value={isStartDate ? formData.startDate : formData.endDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChange}
                minimumDate={isStartDate ? new Date() : formData.startDate}
            />
        );
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.modalTitle}>Tạo đợt thi đấu mới</Text>
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Tên đợt thi đấu"
                            value={formData.name}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                        />

                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={() => setShowStartDatePicker(true)}
                        >
                            <Text>Ngày bắt đầu: {format(formData.startDate, 'dd/MM/yyyy')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={() => setShowEndDatePicker(true)}
                        >
                            <Text>Ngày kết thúc: {format(formData.endDate, 'dd/MM/yyyy')}</Text>
                        </TouchableOpacity>

                        {renderDatePicker(true, showStartDatePicker, handleStartDateChange)}
                        {renderDatePicker(false, showEndDatePicker, handleEndDateChange)}

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Mô tả"
                            multiline
                            value={formData.description}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                        />

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Luật thi đấu"
                            multiline
                            value={formData.rules}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, rules: text }))}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="URL hình ảnh"
                            value={formData.images}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, images: text }))}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={onClose}
                                disabled={isSubmitting}
                            >
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.submitButton, isSubmitting && styles.disabledButton]}
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                            >
                                <Text style={styles.submitButtonText}>
                                    {isSubmitting ? 'Đang xử lý...' : 'Tạo mới'}
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        marginRight: 8,
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        marginLeft: 8,
    },
    disabledButton: {
        opacity: 0.5,
    },
    cancelButtonText: {
        color: '#666',
        textAlign: 'center',
        fontWeight: '600',
    },
    submitButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
});