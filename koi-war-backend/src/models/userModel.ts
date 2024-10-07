import mongoose from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  REFEREE = "referee",
  STAFF = "staff",
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [150, "Name must be less than 150 characters long"],
    },
    email: {
      type: String,
      required: false,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [2, "Username must be at least 2 characters long"],
      maxlength: [30, "Username must be less than 30 characters long"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
