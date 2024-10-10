import mongoose from "mongoose";

const classificationContestRuleSchema = new mongoose.Schema(
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
    varieties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variety",
      },
    ],
  },
  { timestamps: true }
);

const Classification = mongoose.model(
  "ClassificationContestRule",
  classificationContestRuleSchema
);

export default Classification;
