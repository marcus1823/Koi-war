import mongoose from "mongoose";

export enum RegistrationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

const registrationSchema = new mongoose.Schema({
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

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
