import mongoose from "mongoose";

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

const ContestSubCategory = mongoose.model(
  "ContestSubCategory",
  contestSubCategorySchema
);

export default ContestSubCategory;
