import mongoose from "mongoose";
import bcrypt from "bcrypt";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  REFEREE = "referee",
  STAFF = "staff",
}

export interface UserInput {
  email: string;
  name: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
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

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model("User", userSchema);

export default User;
