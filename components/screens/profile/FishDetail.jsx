import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function FishDetail() {
  const [filter, setFilter] = useState('all');
  const competitions = [
    { id: '1', contest: 'Cuộc Thi 1', status: 'Đang diễn ra' },
    { id: '2', contest: 'Cuộc Thi 2', status: 'Đã dự thi' },
    { id: '3', contest: 'Cuộc Thi 3', status: 'Đang diễn ra' },
    { id: '4', contest: 'Cuộc Thi 4', status: 'Đã dự thi' },
  ];

  const dropdownData = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Đang diễn ra', value: 'ongoing' },
    { label: 'Đã dự thi', value: 'completed' },
  ];

  const filteredCompetitions =
    filter === 'all'
      ? competitions
      : competitions.filter((comp) =>
          filter === 'ongoing' ? comp.status === 'Đang diễn ra' : comp.status === 'Đã dự thi'
        );

  const renderCompetitionItem = ({ item }) => (
    <View style={styles.competitionItem}>
      <Text style={styles.competitionFishName}>{item.contest}</Text>
      <Text style={styles.competitionStatus}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/caKoi.png')} style={styles.fishImage} />
      
      <View style={styles.nameBreedContainer}>
        <Text style={styles.fishName}>Tên Cá: Cá Chép</Text>
        <Text style={styles.fishBreed}>Giống: Chép Đỏ</Text>
      </View>
      
      <View style={styles.nameBreedContainer}>
        <Text style={styles.fishBreed}>Cân nặng: 3kg</Text>
        <Text style={styles.fishBreed}>Chiều cao: 2cm</Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>
          Đây là cá chép có màu đỏ, rất hiếm và có giá trị cao trong các cuộc thi...
        </Text>
      </View>

      <View style={styles.dropdownRow}>
        <Text style={styles.competitionTitle}>Cá dự thi:</Text>
        <TouchableOpacity>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dropdownData}
            labelField="label"
            valueField="value"
            placeholder="Tất cả"
            value={filter}
            onChange={(item) => setFilter(item.value)}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCompetitions}
        renderItem={renderCompetitionItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    paddingTop: 50,
  },
  fishImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  nameBreedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  fishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fishBreed: {
    fontSize: 16,
    color: '#666',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  competitionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  dropdown: {
    width: 120,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#666',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
  competitionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  competitionFishName: {
    fontSize: 14,
    fontWeight: '500',
  },
  competitionStatus: {
    fontSize: 14,
    color: '#0288d1',
  },
});
