import mongoose from "mongoose";

const varietySchema = new mongoose.Schema(
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
    images: {
      type: [String],
      required: false,
    },
    classificationContestRules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassificationContestRule",
      },
    ],
  },
  { timestamps: true }
);

const Variety = mongoose.model("Variety", varietySchema);

export default Variety;
