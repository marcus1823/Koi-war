import { IContestSubCategoryService } from "../IContestSubCategoryService";
import { IContestSubCategoryRepository } from "../../repositories/IContestSubCategoryRepository";
import {
  IContestSubCategoryResponse,
  mapContestSubCategoryResponse,
} from "../../types/contestSubCategory";
import { IContestSubCategory } from "../../models/contestSubCategory.model";
import { IClassificationContestRule } from "../../models/classificationContestRule.model";

export class ContestSubCategoryServices implements IContestSubCategoryService {
  private contestSubCategoryRepository: IContestSubCategoryRepository;

  constructor(contestSubCategoryRepository: IContestSubCategoryRepository) {
    this.contestSubCategoryRepository = contestSubCategoryRepository;
  }

  async createContestSubCategory(
    data: any
  ): Promise<IContestSubCategoryResponse> {
    const contestSubCategory =
      await this.contestSubCategoryRepository.createContestSubCategory(data);

    return mapContestSubCategoryResponse(
      contestSubCategory as IContestSubCategory & {
        _id: string;
        createdAt: Date;
        updatedAt: Date;
      }
    );
  }

  async getAllContestSubCategory(): Promise<IContestSubCategoryResponse[]> {
    const contestSubCategory =
      await this.contestSubCategoryRepository.getAllContestSubCategory();
    return contestSubCategory.map((contestSubCategory) =>
      mapContestSubCategoryResponse(
        contestSubCategory as IContestSubCategory & {
          _id: string;
          createdAt: Date;
          updatedAt: Date;
        }
      )
    );
  }

  async getContestSubCategoryById(
    id: string
  ): Promise<IContestSubCategoryResponse | null> {
    const contestSubCategory =
      await this.contestSubCategoryRepository.getContestSubCategoryById(id);
    if (!contestSubCategory) {
      throw new Error("Contest sub category not found");
    }
    return mapContestSubCategoryResponse(
      contestSubCategory as IContestSubCategory & {
        _id: string;
        createdAt: Date;
        updatedAt: Date;
      } & IClassificationContestRule
    );
  }
}
