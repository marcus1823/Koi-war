import mongoose from "mongoose";
import { IFish } from "./fish.model";
import { IContestInstance } from "./contestInstance.model";
import { IContestSubCategory } from "./contestSubCategory.model";

export enum RegistrationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface IRegistration {
  status: RegistrationStatus;
  rank?: number;
  fish: IFish;
  contestInstance: IContestInstance & { _id: string };
  contestSubCategory: IContestSubCategory & { _id: string };
}

interface RegistrationDocument extends IRegistration, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema = new mongoose.Schema<RegistrationDocument>({
  status: {
    type: String,
    enum: Object.values(RegistrationStatus),
    default: RegistrationStatus.PENDING,
  },
  rank: {
    type: Number,
    required: false,
  },
  fish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fish",
    required: true,
  },
  contestInstance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContestInstance",
    required: true,
  },
  contestSubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContestSubCategory",
    required: true,
  },
});

const Registration = mongoose.model<RegistrationDocument>("Registration", registrationSchema);

export default Registration;
