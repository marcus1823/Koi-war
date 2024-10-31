import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api';

export interface Variety {
  _id: string;
  name: string;
  description: string;
}

export const getAllVariety = async (): Promise<Variety[]> => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${API_BASE_URL}/variety/getAllVarieties`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && response.data.success) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch contest instances');
    }
  } catch (error) {
    console.error('Error fetching contest instances:', error);
    throw error;
  }
};