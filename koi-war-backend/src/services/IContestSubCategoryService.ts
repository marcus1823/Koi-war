import {IContestSubCategoryResponse} from "../types/contestSubCategory";

export interface IContestSubCategoryService {
    createContestSubCategory(data: any): Promise<IContestSubCategoryResponse>;
    getAllContestSubCategory(): Promise<IContestSubCategoryResponse[]>;
    getContestSubCategoryById(id: string): Promise<IContestSubCategoryResponse | null>;
}