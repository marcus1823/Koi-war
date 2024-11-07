import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../api";

export interface SubCategoryPayload {
  name: string;
  description: string;
}

export const createSubCategory = async (
  subCategoryData: { name: string; description: string },
  contestInstanceId: string
) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
      `${API_BASE_URL}/contestSubCategory/createContestSubCategory`,
      {
        ...subCategoryData,
        contestInstance: contestInstanceId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("createSubCategory", response);
    return response.data;
  } catch (error) {
    throw new Error("Error creating subcategory: " + error);
  }
};

export const updateSubCategory = async (
  id: string,
  queryParams?: Partial<SubCategory>
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const route = useRoute();
    const contestInstanceId = route.params;

    if (!token) {
      throw new Error("Token not exist!");
    }

    const response = await axios.put(
      `${API_BASE_URL}/contestSubCategory/updateContestSubCategoryById/${id}?contestInstance=${contestInstanceId}`,
      queryParams,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error API update contest SubCategoryById:", error);
    throw error;
  }
};

export interface SubCategory {
  _id: string;
  name: string;
  description: string;
}

export const getAllSubCategories = async (
  contestInstanceId: string
): Promise<SubCategory[]> => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.get(
      `${API_BASE_URL}/contestSubCategory/getAllContestSubCategory?contestInstance=${contestInstanceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.success) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch contest SubCategory");
    }
  } catch (error) {
    console.error("Error fetching contest SubCategory:", error);
    throw error;
  }
};

export const getSubCategoriesById = async (
  contestInstanceId: string
): Promise<SubCategory[]> => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.get(
      `${API_BASE_URL}/contestSubCategory/getAllContestSubCategory?contestInstance=${contestInstanceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.success) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch contest SubCategory");
    }
  } catch (error) {
    console.error("Error fetching contest SubCategory:", error);
    throw error;
  }
};

