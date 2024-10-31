import {IContestInstance} from "../models/contestInstance.model";
import {IContest} from "../models/contest.model";
import {IContestSubCategory} from "../models/contestSubCategory.model";
import {mapContestSubCategoryResponse} from "./contestSubCategory";

export interface IContestInstanceResponse {
    id: string;
    contest: IContest;
    name: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    description?: string;
    rules?: string;
    images?: string;
    isDisabled: boolean;
    contestSubCategories: IContestSubCategory[];
}

export function mapContestInstanceResponse(
    contestInstance: IContestInstance & {
        _id: string;
        createdAt: Date;
        updatedAt: Date;
    }
): IContestInstanceResponse {
    // Chuyển đổi dates về múi giờ địa phương
    const startDate = new Date(contestInstance.startDate);
    const endDate = new Date(contestInstance.endDate);

    return {
        id: contestInstance._id,
        contest: contestInstance.contest,
        name: contestInstance.name,
        startDate: new Date(startDate.getTime() + 7 * 60 * 60 * 1000), // Thêm 7 giờ
        endDate: new Date(endDate.getTime() + 7 * 60 * 60 * 1000),     // Thêm 7 giờ
        isActive: contestInstance.isActive,
        description: contestInstance.description ?? "",
        rules: contestInstance.rules ?? "",
        images: contestInstance.images ? contestInstance.images[0] : "",
        isDisabled: contestInstance.isDisabled,
        contestSubCategories: Array.isArray(contestInstance.contestSubCategories)
            ? contestInstance.contestSubCategories.map(subCategory =>
                mapContestSubCategoryResponse(
                    subCategory as IContestSubCategory & {
                        _id: string; createdAt: Date; updatedAt: Date;
                    }
                )
            )
            : [],
    };
}
