import {IContestSubCategoryRepository} from "../IContestSubCategoryRepository";
import ContestSubCategory, {IContestSubCategory} from "../../models/contestSubCategory.model";
import Contest from "../../models/contest.model";

export class ContestSubCategoryRepository implements IContestSubCategoryRepository {
    async createContestSubCategory(data:any): Promise<IContestSubCategory> {
        const contestSubCategory = new ContestSubCategory(data);
        return contestSubCategory.save();
    }

    async getAllContestSubCategory(): Promise<IContestSubCategory[]> {
        const contestSubCategorys = await ContestSubCategory.find()
            .populate('contestInstance');
        return contestSubCategorys
    }

    async getContestSubCategoriesOfContestInstanceId(contestInstanceId: string): Promise<IContestSubCategory[]> {
        return ContestSubCategory.find({
            contestInstance: contestInstanceId
        });
    }

    async getContestSubCategoryById(id: string): Promise<IContestSubCategory | null> {
        const contestSubCategory = await ContestSubCategory.findById(id)
            .populate("contestInstance");
        return contestSubCategory;
    }
}