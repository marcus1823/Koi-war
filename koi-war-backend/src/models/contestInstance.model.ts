import mongoose from "mongoose";
import {IContest} from "./contest.model";
import {IContestSubCategory} from "./contestSubCategory.model";

export interface IContestInstance {
    contest: IContest;
    name: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    description?: string;
    rules?: string;
    images?: string[];
    isDisabled: boolean;
    contestSubCategories: mongoose.Types.ObjectId[] | IContestSubCategory[];
    isRanked: boolean;
}

interface ContestInstanceDocument extends IContestInstance, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const contestInstanceSchema = new mongoose.Schema<ContestInstanceDocument>(
    {
        contest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contest",
            required: true,
        },
        name: {
            type: String,
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
        isDisabled: {
            type: Boolean,
            default: false,
        },
        contestSubCategories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ContestSubCategory",
            },
        ],
        isRanked: {
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true}
);

const ContestInstance = mongoose.model<ContestInstanceDocument>(
    "ContestInstance",
    contestInstanceSchema
);

export default ContestInstance;
