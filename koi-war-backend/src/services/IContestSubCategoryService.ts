import {IContestSubCategoryResponse} from "../types/contestSubCategory";

export interface IContestSubCategoryService {
    createContestSubCategory(data: any): Promise<IContestSubCategoryResponse>;
}