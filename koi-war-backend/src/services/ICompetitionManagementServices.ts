import {IContestRegistrationResponse} from "../types/contestRegistration";

export interface ICompetitionManagementServices {
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
}