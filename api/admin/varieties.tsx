import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../api";

import { CreateVarietyPayload } from "@/models/types";

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
