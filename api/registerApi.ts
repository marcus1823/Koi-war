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
    const response = await axios.post(`${API_BASE_URL}/users/register`, {
      name: userData.name,
      email: userData.email,
      username: userData.username,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    });

    if (response.data) {
      return {
        success: true,
        message: "Registration successful!",
        data: response.data
      };
    }

    return {
      success: false,
      message: "Registration failed. Please try again.",
    };

  } catch (error: any) {
    console.error("Register API Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed. Please try again.",
    };
  }
};