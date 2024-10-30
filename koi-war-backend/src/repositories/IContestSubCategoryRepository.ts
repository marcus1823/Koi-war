import {IContestSubCategory} from "../models/contestSubCategory.model";

export interface IContestSubCategoryRepository {
    createContestSubCategory(data: any): Promise<IContestSubCategory>;

    getAllContestSubCategory(): Promise<IContestSubCategory[]>;

    getContestSubCategoriesOfContestInstanceId(contestInstanceId: string): Promise<IContestSubCategory[]>;

    getContestSubCategoryById(id: string): Promise<IContestSubCategory | null>;

    updateContestSubCategoryById(id: string, updateData: Partial<IContestSubCategory>): Promise<IContestSubCategory | null>;

    getContestSubCategoryByNameAndInstance(name: string, instanceId: string): Promise<IContestSubCategory | null>;

    getAllContestSubCategoryByContestInstanceId(contestInstanceId: string): Promise<IContestSubCategory[]>;
}