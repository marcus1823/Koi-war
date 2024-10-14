import {IContestSubCategoryService} from "../IContestSubCategoryService";
import {IContestSubCategoryRepository} from "../../repositories/ContestSubCategoryRepository";
import {IContestSubCategoryResponse, mapContestSubCategoryResponse} from "../../types/contestSubCategory";
import {IContestSubCategory} from "../../models/contestSubCategory.model";

export class ContestSubCategoryServices implements IContestSubCategoryService {
    private contestSubCategoryRepository: IContestSubCategoryRepository;

    constructor(contestSubCategoryRepository: IContestSubCategoryRepository) {
        this.contestSubCategoryRepository = contestSubCategoryRepository;
    }

    async createContestSubCategory(data: any): Promise<IContestSubCategoryResponse> {
        const contestSubCategory = await this.contestSubCategoryRepository.createContestSubCategory(data);

        return mapContestSubCategoryResponse(
            contestSubCategory as IContestSubCategory & { _id: string; createdAt: Date; updatedAt: Date}
        )
    }
}