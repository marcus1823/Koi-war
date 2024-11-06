import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

const SubCategories: React.FC = () => {
  const { selectedVarieties } = useLocalSearchParams();
  const varieties = selectedVarieties ? JSON.parse(selectedVarieties as string) : [];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Selected Varieties</Text>
      <FlatList
        data={varieties}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SubCategories;
