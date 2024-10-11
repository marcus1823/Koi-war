import mongoose from "mongoose";
import { IContestInstance } from "./contestInstance.model";

export interface IContestSubCategory {
  name: string;
  description?: string;
  contestInstance: IContestInstance & { _id: string };
}

interface ContestSubCategoryDocument
  extends IContestSubCategory,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const contestSubCategorySchema = new mongoose.Schema(
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
    contestInstance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContestInstance",
      required: true,
    },
  },
  { timestamps: true }
);

const ContestSubCategory = mongoose.model<ContestSubCategoryDocument>(
  "ContestSubCategory",
  contestSubCategorySchema
);

export default ContestSubCategory;
