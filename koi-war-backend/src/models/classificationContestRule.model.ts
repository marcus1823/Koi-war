import mongoose from "mongoose";
import { IContestSubCategory } from "./contestSubCategory.model";

export interface IClassificationContestRule {
  name: string;
  description?: string;
  contestSubCategory: IContestSubCategory & { _id: string };
  varieties: string[];
}

interface ClassificationContestRuleDocument
  extends IClassificationContestRule,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const classificationContestRuleSchema =
  new mongoose.Schema<ClassificationContestRuleDocument>(
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
      contestSubCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ContestSubCategory",
        required: true,
      },
      varieties: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variety",
        },
      ],
    },
    { timestamps: true }
  );

const ClassificationContestRule = mongoose.model<ClassificationContestRuleDocument>(
  "ClassificationContestRule",
  classificationContestRuleSchema
);

export default ClassificationContestRule;