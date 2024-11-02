import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api';

export const getAllContestInstances = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${API_BASE_URL}/contestInstance/getAllContestInstances`, {
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

export interface ContestInstance {
  id: string;
  contest: {
    _id: string;
    name: string;
    description: string;
    contestInstances: string[];
    createdAt: string;
    updatedAt: string;
  };
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description: string;
  rules: string;
  images: string;
  isDisabled: boolean;
  contestSubCategories: {
    id: string;
    name: string;
    description: string;
    contestInstance: string;
  }[];
}

export const getContestInstanceById = async (id: string): Promise<ContestInstance> => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.get(`${API_BASE_URL}/contestInstance/getContestInstanceById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.data.success) {
      return response.data;
    } else {
      throw new Error('Failed to fetch contest instance');
    }
  } catch (error) {
    console.error('Error fetching contest instance:', error);
    throw error;
  }
};