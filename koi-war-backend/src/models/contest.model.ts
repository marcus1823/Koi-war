import mongoose from "mongoose";

export interface IContest {
  name: string;
  description?: string;
}

interface ContestDocument extends IContest, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const contestSchema = new mongoose.Schema<ContestDocument>(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [150, "Name must be less than 150 characters long"],
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Contest = mongoose.model<ContestDocument>("Contest", contestSchema);

export default Contest;
