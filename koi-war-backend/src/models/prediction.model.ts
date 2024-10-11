import mongoose from "mongoose";
import { IUser } from "./user.model";
import { IRegistration } from "./registration.model";

export interface IPrediction {
  user: IUser;
  registration: IRegistration;
  score: number;
  rank: number;
}

interface PredictionDocument extends IPrediction, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const predictionSchema = new mongoose.Schema<PredictionDocument>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
});

const Prediction = mongoose.model<PredictionDocument>("Prediction", predictionSchema);

export default Prediction;
