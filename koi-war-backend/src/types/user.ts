import { IUser } from "../models/user.model";

export interface IUserResponse {
  email: string;
  name: string;
  username: string;
  role: string;
  _id: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export function mapUserResponse(
    user: IUser & { _id: string }
): IUserResponse {
  return {
    email: user.email,
    name: user.name,
    username: user.username,
    role: user.role,
    _id: user._id,
    // createdAt: user.createdAt,
    // updatedAt: user.updatedAt,
  };
}

export interface ILoginResponse {
  token: string;
  user: IUserResponse;
}
