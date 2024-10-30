import mongoose from "mongoose";
import {IContestInstance} from "./contestInstance.model";

export interface IContest {
    name: string;
    description?: string;
    contestInstances: mongoose.Types.ObjectId[] | IContestInstance[];
}

interface ContestDocument extends IContest, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const contestSchema = new mongoose.Schema<ContestDocument>(
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
        contestInstances: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ContestInstance",
        }],
    },
    {timestamps: true}
);

const Contest = mongoose.model<ContestDocument>("Contest", contestSchema);

export default Contest;
