import {IContestRegistrationRepository} from "../../repositories/IContestRegistrationRepository";
import {IClassificationContestRuleServices} from "../IClassificationContestRuleServices";
import {IContestInstanceServices} from "../IContestInstanceServices";
import {IContestRegistrationServices} from "../IContestRegistrationServices";
import {IContestSubCategoryService} from "../IContestSubCategoryService";
import {IFishService} from "../IFishService";
import {IRegistration} from "../../models/registration.model";

export class ContestRegistrationServices
    implements IContestRegistrationServices {
    private contestRegistrationRepository: IContestRegistrationRepository;
    private contestInstanceServices: IContestInstanceServices;
    private fishServices: IFishService;
    private contestSubCategoryServices: IContestSubCategoryService;
    private classificationContestRuleService: IClassificationContestRuleServices;

    constructor(
        contestRegistrationRepository: IContestRegistrationRepository,
        contestInstanceServices: IContestInstanceServices,
        fishServices: IFishService,
        contestSubCategoryServices: IContestSubCategoryService,
        classificationContestRuleService: IClassificationContestRuleServices,
    ) {
        this.contestRegistrationRepository = contestRegistrationRepository;
        this.contestInstanceServices = contestInstanceServices;
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
            await this.contestInstanceServices.getContestInstanceById(
                data.contestInstance
            );
        if (!contestInstance) {
            throw new Error("Contest instance not found");
        }
        const contestSubCategory =
            await this.contestSubCategoryServices.getContestSubCategoryById(
                data.contestSubCategory
            );
        if (!contestSubCategory) {
            throw new Error("Contest sub category not found");
        }

        const fishClassification = await this.checkFishClassification(
            data.fish,
            data.contestSubCategory
        );

        if (!fishClassification) {
            throw new Error("Fish does not meet the classification requirements");
        }

        return this.contestRegistrationRepository.createContestRegistration(data);
    }

    private async checkFishClassification(
        fishId: string,
        contestSubCategoryId: string
    ): Promise<boolean> {
        const fish = await this.fishServices.getFishById(fishId);
        if (!fish) {
            throw new Error("Fish not found");
        }
        const classificationContestRule =
            await this.classificationContestRuleService.getClassificationContestRuleByContestSubCategoryId(
                contestSubCategoryId
            );

        if (classificationContestRule) {
            return (
                fish.weight >= classificationContestRule.weightRange.min &&
                fish.weight <= classificationContestRule.weightRange.max &&
                fish.length >= classificationContestRule.sizeRange.min &&
                fish.length <= classificationContestRule.sizeRange.max
            );
        }
        return true;
    }

    async getContestRegistrationById(id: string): Promise<any> {
        return this.contestRegistrationRepository.getContestRegistrationById(id);
    }

    async getContestRegistrationByFishId(
        fishId: string
    ): Promise<IRegistration & {_id: string}> {
        const contestRegistration =
            await this.contestRegistrationRepository.getContestRegistrationByFishId(
                fishId
            );
        if (!contestRegistration) {
            throw new Error("Contest registration not found");
        }

        return contestRegistration;
    }
}