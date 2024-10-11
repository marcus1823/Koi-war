import { IUserResponse } from "../types/user";

export interface IUserService {
  registerUser(data: any): Promise<IUserResponse>;
  login(data: any): Promise<any>;
  getUserById(id: string): Promise<IUserResponse | null>;
  getUserByEmail(email: string): Promise<IUserResponse | null>;
  getUserByUsername(username: string): Promise<IUserResponse | null>;
}
