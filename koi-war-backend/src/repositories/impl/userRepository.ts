import { IUserRepository } from "../IUserRepository";
import User from "../../models/user.model";

export class UserRepository implements IUserRepository {
  async createUser(data: any): Promise<any> {
    const newUser = new User(data);
    return newUser.save();
  }

  async findUserById(id: string): Promise<any> {
    return User.findById(id);
  }

  async findUserByEmail(email: string): Promise<any> {
    return User.findOne({ email });
  }

  async findUserByUsername(username: string): Promise<any> {
    return User.findOne({ username });
  }
}
