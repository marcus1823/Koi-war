import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Registration {
  id: number;
  name: string;
  // thêm các thông tin liên quan đến fish
}

const RegistrationsList: React.FC<{ route: any }> = ({ route }) => {
  const { registrations } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách đăng ký</Text>
      <FlatList
        data={registrations}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            {/* Hiển thị thêm thông tin nếu cần */}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
});

export default RegistrationsList;
