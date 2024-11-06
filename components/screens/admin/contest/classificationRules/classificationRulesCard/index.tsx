import { ClassificationRule } from '@/models/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ClassificationRuleCardProps {
  classificationRule: ClassificationRule;
}

export const ClassificationRuleCard = ({ classificationRule }: ClassificationRuleCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.name}>{classificationRule.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {classificationRule.description}
        </Text>
        <Text style={styles.condition}>Điều kiện: {classificationRule.condition}</Text>
        <Text style={styles.ranks}>
          {classificationRule.ranks?.map((rank) => rank.name).join(', ')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  condition: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  ranks: {
    fontSize: 14,
    color: '#007AFF',
  },
});