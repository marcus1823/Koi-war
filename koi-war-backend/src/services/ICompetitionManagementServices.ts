import {IRegistration, RegistrationStatus} from "../models/registration.model";
import {IContestRegistrationResponse} from "../types/contestRegistration";

export interface ICompetitionManagementServices {
    getAllContestRegistrations(): Promise<any>;

    createContestRegistration(data: any): Promise<any>;

    getContestRegistrationById(id: string): Promise<any>;

    getContestRegistrationByFishId(
        fishId: string
    ): Promise<IContestRegistrationResponse>;

    scoreRegistration(data: {
        registration: string;
        bodyScore: number;
        patternScore: number;
        colorScore: number;
        referee: string;
    }): Promise<any>;

    rankingContestRegistration(contestSubCategoryId: string): Promise<any>;

    updateRankingEndedContestInstances(): Promise<any>;

    updateContestRegistrationStatus(id: string, status: RegistrationStatus): Promise<IRegistration & { _id: string }>;
}
