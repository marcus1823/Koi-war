import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository";

const register = async (userData: any) => {
  try {
    const user = await userRepository.findUserByEmail(userData.email);
    if (user) {
      throw new Error("Email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Save the user
    const newUser = await userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
  } catch (error) {
    throw error;
  }
};

export const userServices = { register };
