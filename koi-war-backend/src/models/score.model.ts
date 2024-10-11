import mongoose from "mongoose";
import { IRegistration } from "./registration.model";

export interface IScore {
  registration: IRegistration & { _id: string };
  bodyScore: number;
  patternScore: number;
  colorScore: number;
  rank: number;
}

interface ScoreDocument extends IScore, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const scoreSchema = new mongoose.Schema<ScoreDocument>({
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

const Score = mongoose.model<ScoreDocument>("Score", scoreSchema);

export default Score;
