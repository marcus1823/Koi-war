import mongoose from "mongoose";

export interface IVariety {
    name: string;
    description?: string;
    images?: string[];
}

export interface IVarietyDocument extends IVariety, mongoose.Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    classificationContestRules: mongoose.Types.Array<string>;
}

export interface IVarietyWithId extends IVariety {
    _id: string;
}

const varietySchema = new mongoose.Schema<IVarietyDocument>(
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
    {timestamps: true}
);

const Variety = mongoose.model<IVarietyDocument>("Variety", varietySchema);

export default Variety;
