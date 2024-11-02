import {IRegistration, RegistrationStatus} from "../models/registration.model";

export interface IContestRegistrationServices {
    createContestRegistration(data: any): Promise<IRegistration & { _id: string }>;

    getContestRegistrationById(id: string): Promise<IRegistration & { _id: string }>;

    getAllContestRegistrations(): Promise<(IRegistration & { _id: string })[]>;

    getContestRegistrationByFishId(
        fishId: string
    ): Promise<IRegistration & { _id: string }>;

    getContestRegistrationsBySubCategoryId(contestSubCategoryId: string): Promise<(IRegistration & { _id: string })[]>;

    updateContestRegistrationRank(
        registrationId: string,
        rank: number
    ): Promise<any>;

    updateContestRegistrationStatus(id: string, status: RegistrationStatus): Promise<IRegistration & { _id: string }>;
}
