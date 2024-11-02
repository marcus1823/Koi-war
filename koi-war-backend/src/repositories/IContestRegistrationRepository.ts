import {IRegistration, RegistrationStatus} from "../models/registration.model";

export interface IContestRegistrationRepository {
    createContestRegistration(data: {
        fish: string;
        contestInstance: string;
        contestSubCategory: string;
    }): Promise<any>;

    getAllContestRegistration() : Promise<(IRegistration & { _id: string })[]>;

    getContestRegistrationById(id: string): Promise<any>;

    getContestRegistrationByFishId(fishId: string): Promise<any>;

    getContestRegistrationsBySubCategoryId(
        contestSubCategoryId: string
    ): Promise<any[]>;

    updateContestRegistrationRank(
        registrationId: string,
        rank: number
    ): Promise<any>;

    getContestRegistrationsBySubCategoryId(contestSubCategoryId: string): Promise<any[]>;

    updateContestRegistrationStatus(id: string, status: RegistrationStatus): Promise<any>;


}
