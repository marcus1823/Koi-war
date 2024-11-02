import { Contest } from '@/models/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../api';

export const createContest = async (contestData: Contest) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token not exist!');
    }
    
    const response = await axios.post(
      `${API_BASE_URL}/contest/createContest`,
      contestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log('API Response:', response.data); // Log the response to see its structure
    return response.data;
  } catch (error) {
    console.error('Error creating API Contest:', error);
    throw error;
  }
};

export const getContests = async (queryParams?: Partial<Contest>) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token not exist!');
    }
    
    const response = await axios.get(`${API_BASE_URL}/contest/getAllContests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queryParams,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching contests:', error);
    throw error;
  }
};

export const deleteContest = async (id: string, queryParams?: Partial<Contest>) => {
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