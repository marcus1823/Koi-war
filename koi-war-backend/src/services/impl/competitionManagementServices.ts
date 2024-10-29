import {ICompetitionManagementServices} from "../ICompetitionManagementServices";
import {IScoreServices} from "../IScoreServices";
import {IContestRegistrationServices} from "../IContestRegistrationServices";
import {IContestRegistrationResponse} from "../../types/contestRegistration";

export class CompetitionManagementServices implements ICompetitionManagementServices {
    private scoreServices: IScoreServices;
    private registrationServices: IContestRegistrationServices;

    constructor(
        scoreServices: IScoreServices,
        registrationServices: IContestRegistrationServices
    ) {
        this.scoreServices = scoreServices;
        this.registrationServices = registrationServices;
    }

    createContestRegistration(data: any): Promise<any> {
        return this.registrationServices.createContestRegistration(data);
    }

    async getContestRegistrationByFishId(fishId: string): Promise<IContestRegistrationResponse> {

        const contestRegistration = await this.registrationServices.getContestRegistrationByFishId(fishId);

        contestRegistration.score = await this.scoreServices.getScoreByRegistrationId(
            contestRegistration.id
        );

        return contestRegistration;

    }

    getContestRegistrationById(id: string): Promise<any> {
        return this.registrationServices.getContestRegistrationById(id);
    }

    async scoreRegistration(data: {
        registration: string;
        bodyScore: number;
        patternScore: number;
        colorScore: number;
        referee: string
    }): Promise<any> {

        // Check if the registration exists
        const registration =
            await this.registrationServices.getContestRegistrationById(
                data.registration
            );
        if (!registration) {
            throw new Error("Registration not found");
        }

        return this.scoreServices.createScore(data);
    }
}