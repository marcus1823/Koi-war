import {IScoreRepository} from "../../repositories/IScoreRepository";
import {IContestRegistrationServices} from "../IContestRegistrationServices";
import {IScoreServices} from "../IScoreServices";
import {IContestRegistrationRepository} from "../../repositories/IContestRegistrationRepository";

export class ScoreServices implements IScoreServices {
    private scoreRepository: IScoreRepository;
    private registrationRepository: IContestRegistrationRepository;

    constructor(
        scoreRepository: IScoreRepository,
        registrationRepository: IContestRegistrationRepository
    ) {
        this.scoreRepository = scoreRepository;
        this.registrationRepository = registrationRepository;
    }

    async createScore(data: {
        registration: string;
        bodyScore: number;
        patternScore: number;
        colorScore: number;
        referee: string;
    }): Promise<any> {
        // Check if the registration exists
        const registration =
            await this.registrationRepository.getContestRegistrationById(
                data.registration
            );
        if (!registration) {
            throw new Error("Registration not found");
        }

        // Create the score
        return this.scoreRepository.createScore({
            ...data,
        });
    }

    async getScoreByRegistrationId(registrationId: string): Promise<any> {
        return this.scoreRepository.getScoreByRegistrationId(registrationId);
    }
}
