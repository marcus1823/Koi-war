// import bcrypt from "bcrypt";

import { IUserRepository } from "../interfaces/user/IUserRepository";
import { IUserService } from "./IUserService";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  registerUser(data: any): Promise<any> {
    return this.userRepository.createUser(data);
  }
  getUserById(id: string): Promise<any> {
    return this.userRepository.findUserById(id);
  }
  getUserByEmail(email: string): Promise<any> {
    return this.userRepository.findUserByEmail(email);
  }
  getUserByUsername(username: string): Promise<any> {
    return this.userRepository.findUserByUsername(username);
  }
}
