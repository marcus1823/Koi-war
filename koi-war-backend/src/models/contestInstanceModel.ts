import mongoose from "mongoose";

const constestInstanceSchema = new mongoose.Schema(
  {
    contest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
    rules: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

const ContestInstance = mongoose.model(
  "ContestInstance",
  constestInstanceSchema
);

export default ContestInstance;
