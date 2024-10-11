import { IUser } from "../models/user.model";

export interface IUserRepository {
  createUser(data: any): Promise<IUser>;
  findUserById(id: string): Promise<IUser | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserByUsername(username: string): Promise<IUser | null>;
}
