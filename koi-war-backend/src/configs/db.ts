import * as dotenv from "dotenv";
dotenv.config({ path: ".env.dev" });
import mongoose from "mongoose";
import User, { UserRole } from "../models/userModel";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");

    const adminExists = await User.findOne({ role: UserRole.ADMIN });
    if (!adminExists) {
      // Create the admin user
      const adminDefault = new User({
        name: "admin",
        username: "admin",
        password: "admin",
        role: UserRole.ADMIN,
      });
      await adminDefault.save();
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("Error connecting to MongoDB:", error);
    }
    process.exit(1);
  }
};

export { connectDB };
