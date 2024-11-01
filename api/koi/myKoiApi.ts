import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../api';

export interface KoiFish {
    _id: string;
    name: string;
    weight: number;
    length: number;
    variety: {
        _id: string;
        name: string;
        description: string;
        images: string[];
    };
    description: string;
    images: string[];
    user: {
        _id: string;
        name: string;
        email: string;
        username: string;
        role: string;
    };
    createdAt: string;
    updatedAt: string;
    contests?: {
        _id: string;
    }[];
}

export const getMyKoiFishes = async (): Promise<KoiFish[]> => {
    try {
        const token = await AsyncStorage.getItem('token');
        const userData = await AsyncStorage.getItem('user');

        if (!userData) {
            throw new Error('User data not found');
        }
        const user = JSON.parse(userData);

        const response = await axios.get(
            `${API_BASE_URL}/fishes/getFishByUserId/${user._id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Failed to fetch koi fish data');
        }
    } catch (error: any) {
        console.error('Error fetching koi fish:', error);
        throw error;
    }
};

export const getFishDetail = async (fishId: string): Promise<KoiFish> => {
    try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.get(
            `${API_BASE_URL}/fishes/${fishId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Failed to fetch fish details');
        }
    } catch (error: any) {
        console.error('Error fetching fish details:', error);
        throw error;
    }
};

export const createFish = async (fishData: {
    name: string;
    weight: number;
    length: number;
    description: string;
    variety: string;
    images: string[];
}): Promise<any> => {
    try {
        const token = await AsyncStorage.getItem('token');
        
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await axios.post(
            `${API_BASE_URL}/fishes/createFish`,
            fishData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error('Error creating fish:', error);
        throw error;
    }
};