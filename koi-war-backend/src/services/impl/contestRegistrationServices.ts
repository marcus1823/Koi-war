import { IContestRegistrationRepository } from "../../repositories/IContestRegistrationRepository";
import { IClassificationContestRuleServices } from "../IClassificationContestRuleServices";
import { IContestInstanceServices } from "../IContestInstanceServices";
import { IContestRegistrationServices } from "../IContestRegistrationServices";
import { IContestSubCategoryService } from "../IContestSubCategoryService";
import { IFishService } from "../IFishService";

export class ContestRegistrationServices
  implements IContestRegistrationServices
{
  private contestRegistrationRepository: IContestRegistrationRepository;
  private contestInstaceServices: IContestInstanceServices;
  private fishServices: IFishService;
  private contestSubCategoryServices: IContestSubCategoryService;
  private classificationContestRuleService: IClassificationContestRuleServices;

  constructor(
    contestRegistrationRepository: IContestRegistrationRepository,
    contestInstaceServices: IContestInstanceServices,
    fishServices: IFishService,
    contestSubCategoryServices: IContestSubCategoryService,
    classificationContestRuleService: IClassificationContestRuleServices
  ) {
    this.contestRegistrationRepository = contestRegistrationRepository;
    this.contestInstaceServices = contestInstaceServices;
    this.fishServices = fishServices;
    this.contestSubCategoryServices = contestSubCategoryServices;
    this.classificationContestRuleService = classificationContestRuleService;
  }

  async createContestRegistration(data: {
    fish: string;
    contestInstance: string;
    contestSubCategory: string;
  }): Promise<any> {
    const contestInstance =
      await this.contestInstaceServices.getContestInstanceById(
        data.contestInstance
      );
    if (!contestInstance) {
      throw new Error("Contest instance not found");
    }
    const fish = await this.fishServices.getFishById(data.fish);
    if (!fish) {
      throw new Error("Fish not found");
    }
    const contestSubCategory =
      await this.contestSubCategoryServices.getContestSubCategoryById(
        data.contestSubCategory
      );
    if (!contestSubCategory) {
      throw new Error("Contest sub category not found");
    }

    const classificationContestRule =
      await this.classificationContestRuleService.getClassificationContestRuleByContestSubCategoryId(
        data.contestSubCategory
      );

    if (classificationContestRule) {
      const isFishQualified =
        fish.weight >= classificationContestRule.weightRange.min &&
        fish.weight <= classificationContestRule.weightRange.max &&
        fish.length >= classificationContestRule.sizeRange.min &&
        fish.length <= classificationContestRule.sizeRange.max;
      if (!isFishQualified) {
        throw new Error(
          "The fish does not meet the classification criteria for the selected contest subcategory."
        );
      }
    }

    return this.contestRegistrationRepository.createContestRegistration(data);
  }
}
