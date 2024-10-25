import {IContestSubCategory} from "../models/contestSubCategory.model";

export interface IContestSubCategoryRepository {
    createContestSubCategory(data: any): Promise<IContestSubCategory>;
    getContestSubCategoriesOfContestInstanceId(contestInstanceId: string): Promise<IContestSubCategory[]>;
}