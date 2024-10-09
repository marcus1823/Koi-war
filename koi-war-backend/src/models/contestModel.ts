import mongoose from "mongoose";

const constestSchema = new mongoose.Schema(
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

const Contest = mongoose.model("Contest", constestSchema);

export default Contest;
