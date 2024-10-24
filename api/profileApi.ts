import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from './api';

export const getUserById = async () => {
  try {
    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw new Error('Token not exist!');
    }

    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting API user information: ', error);
    throw error;
  }
};
