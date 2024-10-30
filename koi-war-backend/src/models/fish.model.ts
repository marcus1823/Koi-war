import mongoose from "mongoose";
import {IVariety} from "./variety.model";
import {IUser} from "./user.model";

export interface IFish {
    name: string;
    weight: number;
    length: number;
    images?: string[];
    description?: string;
    user: IUser;
    variety: IVariety | string;
}

interface FishDocument extends IFish, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const fishSchema = new mongoose.Schema<FishDocument>(
    {
        name: {
            type: String,
            required: true,
            minlength: [2, "Name must be at least 2 characters long"],
            maxlength: [150, "Name must be less than 150 characters long"],
        },
        weight: {
            type: Number,
            required: true,
            min: [0.01, "Weight must be at least 0.01"],
        },
        length: {
            type: Number,
            required: true,
            min: [0.01, "Length must be at least 0.01"],
        },
        images: {
            type: [String],
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        variety: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Variety",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {timestamps: true}
);

const Fish = mongoose.model<FishDocument>("Fish", fishSchema);

export default Fish;
