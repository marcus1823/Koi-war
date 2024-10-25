import {IContestSubCategoryRepository} from "../ContestSubCategoryRepository";
import ContestSubCategory, {IContestSubCategory} from "../../models/contestSubCategory.model";

export class ContestSubCategoryRepository implements IContestSubCategoryRepository {
    async createContestSubCategory(data:any): Promise<IContestSubCategory> {
        const contestSubCategory = new ContestSubCategory(data);
        return contestSubCategory.save();
    }

    async getContestSubCategoriesOfContestInstanceId(contestInstanceId: string): Promise<IContestSubCategory[]> {
        return ContestSubCategory.find({
            contestInstance: contestInstanceId
        });
    }
}