import { Contest, ContestInstance } from '@/models/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../api';

export const createContestInstances = async (contestId: string, contestInstancesData: ContestInstance) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token not exist!');
    }
    
    const response = await axios.post(
      `${API_BASE_URL}/contestInstance/createContestInstance`,
      contestInstancesData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log('API Response ContestInstance:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating API ContestInstance:', error);
    throw error;
  }
};

export const getContestInstances = async (contestId: string, queryParams?: Partial<ContestInstance>) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token not exist!');
    }
    
    const response = await axios.get(`${API_BASE_URL}/contestInstance/getAllContestInstances`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params:
      contestId,
      ...queryParams,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching all ContestInstances:', error);
    throw error;
  }
};

export const deleteContestInstance = async (id: string, queryParams?: Partial<ContestInstance>) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token not exist!');
    }
    
    const response = await axios.delete(`${API_BASE_URL}/contest/deleteContestById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queryParams,
    });
    console.log("deleteContest", response);
    
    return response.data;
  } catch (error) {
    console.error('Error API delete contests:', error);
    throw error;
  }
};

export const updateContest = async (id: string, queryParams?: Partial<Contest>) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token not exist!');
    }

    const response = await axios.put(
      `${API_BASE_URL}/contest/updateContestById/${id}`,
      queryParams,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    console.log("updateContest", response);
    return response.data;
  } catch (error) {
    console.error('Error API update contests:', error);
    throw error;
  }
};