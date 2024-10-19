import { RegisterUser } from "@/models/types";
import axios from "axios";
import { API_BASE_URL } from '../api/api';

interface RegisterUserResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const registerUser = async (
  userData: RegisterUser
): Promise<RegisterUserResponse> => {
  try {
    // Use the required fields in the API call
    const response = await axios.post(`${API_BASE_URL}/users/register`, {
      name: userData.name,
      email: userData.email,
      username: userData.username,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      
    });
    console.log("registerUserApi", response);
    return response.data;
  } catch (error: any) {
    console.log("registerUserApi", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Registration failed. Please try again.",
    };
  }
};
