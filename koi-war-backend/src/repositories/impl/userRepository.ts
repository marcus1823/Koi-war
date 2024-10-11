import { IUserRepository } from "../IUserRepository";
import User, { IUser } from "../../models/user.model";

export class UserRepository implements IUserRepository {
  async createUser(data: any): Promise<IUser> {
    const user = new User(data);
    return user.save();
  }

  async findUserById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findUserByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username });
  }
}
