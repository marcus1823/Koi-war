import { Login } from '@/models/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from './api';

export const loginUser = async (username: string, password: string): Promise<Login> => {
  try {
    const response = await axios.post<{ user: Login; token: string }>(`${API_BASE_URL}/users/login`, {
      username,
      password,
    });

    const { token, user } = response.data;
    
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
