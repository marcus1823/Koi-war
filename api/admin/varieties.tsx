import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../api";

import { CreateVarietyPayload, Variety } from "@/models/types";

export const createVariety = async (varietyData: CreateVarietyPayload) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token not exist!");
    }

    const response = await axios.post(
      `${API_BASE_URL}/variety/createVariety`,
      varietyData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("API Variety Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating API Variety:", error);
    throw error;
  }
};

export const updateVariety = async (id: string, queryParams?: Partial<Variety>) => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        throw new Error('Token not exist!');
      }
  
      const response = await axios.put(
        `${API_BASE_URL}/variety/updateVarietyById/${id}`,
        queryParams,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      console.log("updateVariety", response);
      return response.data;
    } catch (error) {
      console.error('Error API update Variety:', error);
      throw error;
    }
  };

export const deleteVariety = async (id: string, queryParams?: Partial<Variety>) => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        throw new Error('Token not exist!');
      }
      
      const response = await axios.delete(`${API_BASE_URL}/variety/deleteVarietyById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: queryParams,
      });
      console.log("deleteVariety", response);
      
      return response.data;
    } catch (error) {
      console.error('Error API delete Variety:', error);
      throw error;
    }
  };