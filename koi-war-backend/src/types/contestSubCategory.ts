import {IContestInstance} from "../models/contestInstance.model";
import {IContestSubCategory} from "../models/contestSubCategory.model";

export interface IContestSubCategoryResponse {
    id: string;
    name: string,
    description?: string,
    contestInstance: IContestInstance;
}

export function mapContestSubCategoryResponse(
    contestSubCategory: IContestSubCategory & { _id: string; createdAt: Date; updatedAt: Date },
): IContestSubCategoryResponse {
    return {
        id: contestSubCategory._id,
        name: contestSubCategory.name,
        description: contestSubCategory.description,
        contestInstance: contestSubCategory.contestInstance as IContestInstance,
    }
}