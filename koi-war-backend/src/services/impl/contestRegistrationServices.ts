import {IContestRegistrationRepository} from "../../repositories/IContestRegistrationRepository";
import {IClassificationContestRuleServices} from "../IClassificationContestRuleServices";
import {IContestInstanceServices} from "../IContestInstanceServices";
import {IContestRegistrationServices} from "../IContestRegistrationServices";
import {IContestSubCategoryService} from "../IContestSubCategoryService";
import {IFishService} from "../IFishService";
import {IRegistration, RegistrationStatus} from "../../models/registration.model";
import {IContestResponse} from "../../types/contest";
import {mapContestRegistrationResponse} from "../../types/contestRegistration";

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

    async getContestRegistrationById(id: string): Promise<IRegistration & { _id: string }> {
        return this.contestRegistrationRepository.getContestRegistrationById(id);
    }

    // async getAllContestRegistrations(): Promise<IRegistration[]> {
    //    const registrations = await this.contestRegistrationRepository.getAllContestRegistration();
    //    return registrations.map((registration) => mapContestRegistrationResponse(
    //        registration as IRegistration & {
    //            _id: string;
    //            createdAt: Date;
    //            updatedAt: Date;
    //        }
    //    ))
    // }

    async getAllContestRegistrations(): Promise<(IRegistration & { _id: string })[]> {
        return this.contestRegistrationRepository.getAllContestRegistration();
    }

    async getContestRegistrationByFishId(
        fishId: string
    ): Promise<IRegistration & { _id: string }> {
        const contestRegistration =
            await this.contestRegistrationRepository.getContestRegistrationByFishId(
                fishId
            );
        if (!contestRegistration) {
            throw new Error("Contest registration not found");
        }

        return contestRegistration;
    }

    getContestRegistrationsBySubCategoryId(contestSubCategoryId: string): Promise<(IRegistration & { _id: string })[]> {
        return this.contestRegistrationRepository.getContestRegistrationsBySubCategoryId(contestSubCategoryId);
    }

    async updateContestRegistrationRank(
        registrationId: string,
        rank: number
    ): Promise<any> {
        const contestRegistration = this.contestRegistrationRepository.updateContestRegistrationRank(
            registrationId,
            rank
        );
        return contestRegistration;
    }

    async updateContestRegistrationStatus(id: string, status: RegistrationStatus): Promise<IRegistration & {
        _id: string
    }> {
        const registration = await this.contestRegistrationRepository.getContestRegistrationById(id);
        if (!registration) {
            throw new Error("Contest registration not found");
        }
        const currentStatus = registration.status;
        if (currentStatus === RegistrationStatus.REJECTED) {
            throw new Error("Registration already rejected, cannot update status");
        }
        const updatedRegistration = await this.contestRegistrationRepository.updateContestRegistrationStatus(id, status);
        if (!updatedRegistration) {
            throw new Error("Failed to update registration status");
        }
        return updatedRegistration;
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
}
