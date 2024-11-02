import { ContestInstance } from '@/models/types';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Đảm bảo bạn đã cài đặt react-native-vector-icons
import { CreateContestInstanceModal } from './instancesModal';

const ContestInstances: React.FC = () => {
    const [instances, setInstances] = useState<ContestInstance[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // Giả lập fetch dữ liệu từ API
        const fetchContestInstances = async () => {
            try {
                const response = await fetch('https://your-api-url.com/api/contest-instances'); // Thay đổi URL theo API thực tế của bạn
                const data = await response.json();
                setInstances(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchContestInstances();
    }, []);

    const handleAddNewInstance = (newInstance: ContestInstance) => {
        // Logic để thêm mới một ContestInstance
        setInstances((prevInstances) => [...prevInstances, newInstance]);
    };

    const renderInstance = ({ item }: { item: ContestInstance }) => (
        <View style={styles.card}>
            {item.images?.[0] && <Image source={{ uri: item.images[0] }} style={styles.image} />}
            <View style={styles.cardContent}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.dateText}>
                    {`${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()}`}
                </Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.subcategory}>
                    Hạng mục: {item.contestSubCategories.join(", ")}
                </Text>
                {/* Bạn có thể thêm quy tắc phân loại và hạng nếu cần thiết */}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('Back button pressed')}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tên Cuộc thi</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="add-circle" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Đợt thi đấu mới</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={instances}
                renderItem={renderInstance}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Chưa có đợt thi đấu nào được tạo</Text>
                }
            />
            <CreateContestInstanceModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleAddNewInstance}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#6200ee", // Thay đổi màu nền của header
    },
    headerTitle: { flex: 1, fontSize: 20, fontWeight: "bold", color: "#fff" },
    card: { backgroundColor: "#fff", borderRadius: 12, marginBottom: 16, overflow: 'hidden' },
    image: { height: 200, width: '100%', resizeMode: 'cover' },
    cardContent: { padding: 16 },
    title: { fontSize: 18, fontWeight: "bold" },
    dateText: { color: "#666", marginTop: 4 },
    description: { marginTop: 4, color: "#333" },
    subcategory: { marginTop: 4, color: "#333" },
    buttonText: { color: "#fff", marginLeft: 8 },
    emptyText: { color: "#666", textAlign: "center", padding: 32 },
});

export default ContestInstances;
