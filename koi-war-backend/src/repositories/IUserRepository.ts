export interface IUserRepository {
  createUser(data: any): Promise<any>;
  findUserById(id: string): Promise<any>;
  findUserByEmail(email: string): Promise<any>;
  findUserByUsername(username: string): Promise<any>;
}
