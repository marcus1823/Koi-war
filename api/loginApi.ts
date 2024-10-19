import axios from 'axios';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      username,
      password,
    });
    return response.data; // Return the response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific Axios error
      throw new Error(error.response?.data.message || 'Login failed');
    } else {
      // Handle unexpected error
      throw new Error('An unexpected error occurred');
    }
  }
};
