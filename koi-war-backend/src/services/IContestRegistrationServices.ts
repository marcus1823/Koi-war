import {IRegistration} from "../models/registration.model";

export interface IContestRegistrationServices {
    createContestRegistration(data: any): Promise<any>;

    getContestRegistrationById(id: string): Promise<any>;

    getContestRegistrationByFishId(
        fishId: string
    ): Promise<IRegistration & { _id: string }>;

    getContestRegistrationsBySubCategoryId(contestSubCategoryId: string): Promise<(IRegistration & { _id: string })[]>;
}