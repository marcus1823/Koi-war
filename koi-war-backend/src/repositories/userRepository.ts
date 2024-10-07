import User from "../models/userModel";

const createUser = async (user: any) => {
  const newUser = new User(user);
  return newUser.save();
};

const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

export const userRepository =  { createUser, findUserByEmail };