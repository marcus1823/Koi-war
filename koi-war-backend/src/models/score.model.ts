import mongoose from "mongoose";
import { IRegistration } from "./registration.model";
import { IUser } from "./user.model";

export interface IScore {
  registration: IRegistration & { _id: string };
  bodyScore: number;
  patternScore: number;
  colorScore: number;
  rank: number;
  referee: IUser & { _id: string };
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
  },
  referee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Score = mongoose.model<ScoreDocument>("Score", scoreSchema);

export default Score;
