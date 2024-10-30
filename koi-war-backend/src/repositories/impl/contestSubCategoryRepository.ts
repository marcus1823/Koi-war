import { IContestSubCategoryRepository } from "../IContestSubCategoryRepository";
import ContestSubCategory, {
  IContestSubCategory,
} from "../../models/contestSubCategory.model";
import Contest from "../../models/contest.model";

export class ContestSubCategoryRepository
  implements IContestSubCategoryRepository
{
  async createContestSubCategory(data: any): Promise<IContestSubCategory> {
    const contestSubCategory = new ContestSubCategory(data);
    return contestSubCategory.save();
  }

  async getAllContestSubCategory(): Promise<IContestSubCategory[]> {
    const contestSubCategorys = await ContestSubCategory.find().populate(
      "contestInstance"
    );
    return contestSubCategorys;
  }

  async getContestSubCategoriesOfContestInstanceId(
    contestInstanceId: string
  ): Promise<IContestSubCategory[]> {
    return ContestSubCategory.find({
      contestInstance: contestInstanceId,
    });
  }

  async getContestSubCategoryById(
    id: string
  ): Promise<IContestSubCategory | null> {
    const contestSubCategory = await ContestSubCategory.findById(id)
      .populate("contestInstance")
      .populate("classificationContestRule");
    return contestSubCategory;
  }

  async updateContestSubCategoryById(id: string, updateData: Partial<IContestSubCategory>): Promise<IContestSubCategory | null> {
    return ContestSubCategory.findByIdAndUpdate(id, updateData, {new: true})
      .populate("contestInstance");
  }

  async getContestSubCategoryByNameAndInstance(
    name: string, 
    instanceId: string
  ): Promise<IContestSubCategory | null> {
    return ContestSubCategory.findOne({
      contestInstance: instanceId,
      name: name
    });
  }
}
