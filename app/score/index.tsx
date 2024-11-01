import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { createScore } from '../../api/scoreApi';

export default function CreateScore() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [bodyScore, setBodyScore] = useState('');
  const [patternScore, setPatternScore] = useState('');
  const [colorScore, setColorScore] = useState('');
  const [rank, setRank] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateScores = () => {
    const scores = [bodyScore, patternScore, colorScore];
    for (let score of scores) {
      const numScore = Number(score);
      if (isNaN(numScore) || numScore < 0 || numScore > 10) {
        setError('Scores must be between 0 and 10');
        return false;
      }
    }
    
    const numRank = Number(rank);
    if (isNaN(numRank) || numRank < 1) {
      setError('Rank must be a positive number');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateScores()) return;
      
      setLoading(true);
      setError('');

      await createScore({
        registration: params.registrationId as string,
        bodyScore: Number(bodyScore),
        patternScore: Number(patternScore),
        colorScore: Number(colorScore),
        rank: Number(rank),
        referee: params.refereeId as string
      });

      router.back();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient 
        colors={['#eb7452', '#5C98BB']} 
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Score Fish</Text>
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.card}>
            {[
              { label: 'Body Score (0-10)', value: bodyScore, setter: setBodyScore },
              { label: 'Pattern Score (0-10)', value: patternScore, setter: setPatternScore },
              { label: 'Color Score (0-10)', value: colorScore, setter: setColorScore },
              { label: 'Rank', value: rank, setter: setRank },
            ].map((field, index) => (
              <View key={index} style={[
                styles.inputContainer,
                index !== 3 && styles.inputDivider
              ]}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={field.setter}
                  keyboardType="numeric"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  placeholderTextColor="#666"
                />
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Submitting...' : 'Submit Score'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    minHeight: '100%',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 15,
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#eb7452',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: '#fff',
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    overflow: 'hidden',
    fontSize: 14,
  },
}); 