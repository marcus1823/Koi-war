import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true,
  },
  bodyScore: {
    type: Number,
    required: true,
  },
  patternScore: {
    type: Number,
    required: true,
  },
  colorScore: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
});

const Score = mongoose.model("Score", scoreSchema);

export default Score;
