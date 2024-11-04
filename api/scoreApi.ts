import axios from 'axios';
import { API_BASE_URL } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ScoreData {
  registration: string;
  bodyScore: number;
  patternScore: number;
  colorScore: number;
}

export const createScore = async (scoreData: ScoreData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await axios.post(
      `${API_BASE_URL}/score/create`,
      scoreData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to submit score');
    }
  } catch (error: any) {
    console.error('Error creating score:', error);
    throw error;
  }
};
