import { Contest, ContestInstance } from '@/models/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../api';


export const createContestInstance = async (
  contestId: string,
  formData: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    rules: string;
    images: string[];
    isActive: boolean;
    isDisabled: boolean;
    contestSubCategories: string[];
  }
) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not exist!');
    }

    // Format dates to dd-MM-yyyy
    const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const payload = {
      contest: contestId,
      name: formData.name,
      description: formData.description,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
      rules: formData.rules,
      images: formData.images[0] || "",
      isActive: formData.isActive,
      isDisabled: formData.isDisabled,
      contestSubCategories: formData.contestSubCategories,
    };

    const response = await axios.post(
      `${API_BASE_URL}/contestInstance/createContestInstance`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export const getContestInstancesById = async (contestId: string, queryParams?: Partial<Contest>) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token not exist!');
    }
    
    const response = await axios.get(`${API_BASE_URL}/contestInstance/getContestInstanceById/${contestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queryParams || {},
    });
    console.log("getContestInstancesById", response);
    return response.data;
  } catch (error) {
    console.error('Error fetching All ContestInstances By Id:', error);
    throw error;
  }
};

export const deleteContestInstance = async (id: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not exist!');
    }

    const response = await axios.delete(
      `${API_BASE_URL}/contestInstance/deleteContestInstanceById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error deleting contest instance:', error);
    throw error;
  }
};

export interface UpdateContestInstanceData {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  rules: string;
  images: string[];
  isActive: boolean;
  isDisabled: boolean;
  contestSubCategories: string[];
}

export const updateContestInstance = async (
  id: string,
  formData: UpdateContestInstanceData
) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not exist!');
    }

    const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const payload = {
      name: formData.name,
      description: formData.description,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
      rules: formData.rules,
      images: formData.images[0] || "",
      isActive: formData.isActive,
      isDisabled: formData.isDisabled,
      contestSubCategories: formData.contestSubCategories,
    };

    const response = await axios.put(
      `${API_BASE_URL}/contestInstance/updateContestInstanceById/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating contest instance:', error);
    throw error;
  }
};
