// import bcrypt from "bcrypt";

import { IUser, UserDocument } from "../../models/user.model";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserResponse, mapUserResponse } from "../../types/user";
import { generateAccessToken } from "../../utils/jwt.utils";
import { IUserService } from "../IUserService";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async registerUser(data: IUser): Promise<IUserResponse> {
    const user = await this.userRepository.createUser(data);
    return mapUserResponse(user as IUser & { _id: string; createdAt: Date; updatedAt: Date });
  }
  async login(data: { username: string; password: string }): Promise<any> {
    const user = (await this.userRepository.findUserByUsername(
      data.username
    )) as UserDocument;
    console.log("user", user);
    if (!user) {
      throw new Error("User not found");
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Extract necessary fields for the token payload
    const payload = {
      email: user.email,
      username: user.username,
      role: user.role,
      id: user.id,
    };

    // Generate token
    const token = generateAccessToken(payload);

    return {
      user: mapUserResponse(user as IUser & { _id: string; createdAt: Date; updatedAt: Date }),
      token,
    };
  }
  async getUserById(id: string) {
    const user = await this.userRepository.findUserById(id);
    return mapUserResponse(user as IUser & { _id: string; createdAt: Date; updatedAt: Date });
  }
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    return mapUserResponse(user as IUser & { _id: string; createdAt: Date; updatedAt: Date });
  }
  async getUserByUsername(username: string) {
    const user = await this.userRepository.findUserByUsername(username);
    return mapUserResponse(user as IUser & { _id: string; createdAt: Date; updatedAt: Date });
  }
}
