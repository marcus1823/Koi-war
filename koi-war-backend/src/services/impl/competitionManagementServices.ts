import {ICompetitionManagementServices} from "../ICompetitionManagementServices";
import {IScoreServices} from "../IScoreServices";
import {IContestRegistrationServices} from "../IContestRegistrationServices";
import {IContestRegistrationResponse, mapContestRegistrationResponse,} from "../../types/contestRegistration";
import {totalScoreOfAReferee} from "../../utils/expression.utils";
import {IContestInstanceServices} from "../IContestInstanceServices";
import {IContestSubCategoryService} from "../IContestSubCategoryService";
import {IRegistration, RegistrationStatus} from "../../models/registration.model";

export class CompetitionManagementServices
    implements ICompetitionManagementServices {
    private scoreServices: IScoreServices;
    private registrationServices: IContestRegistrationServices;
    private contestInstanceServices: IContestInstanceServices;
    private contestSubCategoryServices: IContestSubCategoryService;

    constructor(
        scoreServices: IScoreServices,
        registrationServices: IContestRegistrationServices,
        contestInstanceServices: IContestInstanceServices,
        contestSubCategoryServices: IContestSubCategoryService
    ) {
        this.scoreServices = scoreServices;
        this.registrationServices = registrationServices;
        this.contestInstanceServices = contestInstanceServices;
        this.contestSubCategoryServices = contestSubCategoryServices;
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
        const registrationsWithScores = await this.getRegistrationsWithScores(contestSubCategoryId);
        return this.assignRanks(registrationsWithScores);
    }

    async updateRankingEndedContestInstances(): Promise<void> {
        const endedContestInstances = await this.getEndedContestInstances();
        await Promise.all(
            endedContestInstances.map(async (contestInstance) => {
                const contestSubCategories = await this.contestSubCategoryServices.getAllContestSubCategoryByContestInstance(contestInstance.id);
                await Promise.all(
                    contestSubCategories.map(async (contestSubCategory) => {
                        await this.updateContestSubCategoryRankings(contestSubCategory.id);
                    })
                );
                await this.contestInstanceServices.updateContestInstanceRankedStatus(contestInstance.id);
            })
        );
    }

    async updateContestRegistrationStatus(
        id: string,
        status: RegistrationStatus
    ): Promise<IRegistration & { _id: string }> {
        // Delegate to contestRegistrationServices
        return this.registrationServices.updateContestRegistrationStatus(id, status);
    }

    private calculateTotalScore(scores: any[]): number {
        return (scores?.reduce((acc, score) => acc + totalScoreOfAReferee(score), 0) ?? 0) / scores.length;
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

    private async getRegistrationsWithScores(contestSubCategoryId: string): Promise<{
        registration: any,
        totalScore: number | null | undefined
    }[]> {
        const registrations = await this.registrationServices.getContestRegistrationsBySubCategoryId(contestSubCategoryId);

        return Promise.all(
            registrations.map(async (registration) => {
                registration.scores = await this.scoreServices.getScoreByRegistrationId(
                    registration._id
                );
                const totalScore = this.calculateTotalScore(registration.scores ?? []);
                return {
                    registration,
                    totalScore,
                };
            })
        );
    }

    private async getEndedContestInstances(): Promise<any[]> {
        return this.contestInstanceServices.getEndedContestInstances();
    }

    private async updateContestSubCategoryRankings(contestSubCategoryId: string): Promise<void> {
        const registrationsWithScores = await this.getRegistrationsWithScores(contestSubCategoryId);
        const rankedRegistrations = this.assignRanks(registrationsWithScores).filter(
            (rankedRegistration) => rankedRegistration.rank <= 5
        );
        await Promise.all(
            rankedRegistrations.map(
                async (rankedRegistration: { registration: { _id: any; }; rank: any; }) => {
                    await this.registrationServices.updateContestRegistrationRank(
                        rankedRegistration.registration._id,
                        rankedRegistration.rank
                    );
                })
        )
    }
}
