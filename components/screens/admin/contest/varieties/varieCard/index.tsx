import { Variety } from '@/models/types';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface VarietyCardProps {
  variety: Variety;
  onEdit: (variety: Variety) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (variety: Variety) => void;
}

const VarietyCard: React.FC<VarietyCardProps> = ({
  variety,
  onEdit,
  onDelete,
  isSelected = false,
  onSelect,
}) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: variety.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {variety.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {variety.description}
        </Text>
        
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.checkboxButton]}
            onPress={() => onSelect?.(variety)}
            activeOpacity={0.7}
          >
            <Icon 
              name={isSelected ? "check-box" : "check-box-outline-blank"} 
              size={20} 
              color={isSelected ? "#4CAF50" : "#757575"}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => onEdit(variety)}
          >
            <Icon name="edit" size={20} color="#2196F3" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => onDelete(variety._id)}
          >
            <Icon name="delete" size={20} color="#f44336" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    maxWidth: '47%',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  checkboxButton: {
    backgroundColor: 'transparent',
    marginRight: 45,
  },
  editButton: {
    backgroundColor: '#e3f2fd',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
});

export default VarietyCard;
