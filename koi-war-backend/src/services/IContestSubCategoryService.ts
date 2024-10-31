import {IContestSubCategory} from "../models/contestSubCategory.model";
import {IContestSubCategoryResponse} from "../types/contestSubCategory";

export interface IContestSubCategoryService {
    createContestSubCategory(data: any): Promise<IContestSubCategoryResponse>;

    getAllContestSubCategory(): Promise<IContestSubCategoryResponse[]>;

    getContestSubCategoryById(id: string): Promise<IContestSubCategoryResponse | null>;

    updateContestSubCategoryById(id: string, updateData: Partial<IContestSubCategory>): Promise<IContestSubCategoryResponse | null>;

    getAllContestSubCategoryByContestInstance(contestInstanceId: string): Promise<IContestSubCategoryResponse[]>;
}