import {ICompetitionManagementServices} from "../ICompetitionManagementServices";
import {IScoreServices} from "../IScoreServices";
import {IContestRegistrationServices} from "../IContestRegistrationServices";
import {
    IContestRegistrationResponse,
    mapContestRegistrationResponse,
} from "../../types/contestRegistration";
import {totalScoreOfAReferee} from "../../utils/expression.utils";
import { IRegistration, RegistrationStatus } from "../../models/registration.model";

export class CompetitionManagementServices
    implements ICompetitionManagementServices {
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

    async getContestRegistrationByFishId(
        fishId: string
    ): Promise<IContestRegistrationResponse> {
        const contestRegistration =
            await this.registrationServices.getContestRegistrationByFishId(fishId);

        contestRegistration.scores =
            await this.scoreServices.getScoreByRegistrationId(
                contestRegistration._id
            );

        // return contestRegistration;
        return mapContestRegistrationResponse(contestRegistration);
    }

    getContestRegistrationById(id: string): Promise<any> {
        return this.registrationServices.getContestRegistrationById(id);
    }

    async scoreRegistration(data: {
        registration: string;
        bodyScore: number;
        patternScore: number;
        colorScore: number;
        referee: string;
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

    async rankingContestRegistration(contestSubCategoryId: string): Promise<any> {
        const registrations =
            await this.registrationServices.getContestRegistrationsBySubCategoryId(
                contestSubCategoryId
            );

        const registrationsWithScores = await Promise.all(
            registrations.map(async (registration) => {
                registration.scores = await this.scoreServices.getScoreByRegistrationId(
                    registration._id
                );
                const totalScore = registration.scores?.reduce(
                    (acc, score) => acc + totalScoreOfAReferee(score),
                    0
                );
                return {
                    registration,
                    totalScore,
                };
            })
        );

        registrationsWithScores.sort((a, b) => {
            return (b.totalScore ?? 0) - (a.totalScore ?? 0);
        });

        return this.assignRanks(registrationsWithScores);
    }

    private assignRanks(
        registrationsWithScores: {
            registration: any;
            totalScore: number | null | undefined;
        }[]
    ): any[] {
        let rank = 1;
        let previousScore: number | null | undefined = null;
        let previousRank = 1;

        return registrationsWithScores.map((entry, index) => {
            if (entry.totalScore !== previousScore) {
                rank = index + 1;
                previousScore = entry.totalScore;
                previousRank = rank;
            } else {
                rank = previousRank;
            }

            return {
                rank: rank,
                registration: entry.registration,
                totalScore: entry.totalScore,
            };
        });
    }

    async updateContestRegistrationStatus(
        id: string, 
        status: RegistrationStatus
    ): Promise<IRegistration & { _id: string }> {
        // Delegate to contestRegistrationServices
        return this.registrationServices.updateContestRegistrationStatus(id, status);
    }
}