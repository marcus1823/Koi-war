import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api';

export const assignToContest = async (
  fish: string,
  contestInstance: string,
  contestSubCategory: string
): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await axios.post(
      `${API_BASE_URL}/contestRegistration/registerContest`,
      {
        fish,
        contestInstance,
        contestSubCategory
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Failed to register for contest');
    }
  } catch (error: any) {
    console.error('Error registering for contest:', error);
    throw error;
  }
};

export const getContestsByFishId = async (fishId: string) => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await axios.get(`${API_BASE_URL}/contestRegistration/getByFishId/${fishId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      return response.data;
    } else {
      throw new Error('Failed to fetch contests for the fish');
    }
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};


export const getAllRegistrations = async (): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await axios.get(
      `${API_BASE_URL}/contestRegistration/getAll`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Failed to fetch registrations');
    }
  } catch (error: any) {
    console.error('Error fetching registrations:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const updateRegistrationStatus = async (
  registrationId: string,
  status: 'pending' | 'approved' | 'rejected'
): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await axios.patch(
      `${API_BASE_URL}/contestRegistration/updateStatus/${registrationId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Failed to update registration status');
    }
  } catch (error: any) {
    console.error('Error updating registration status:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};