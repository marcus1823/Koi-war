import {IScoreRepository} from "../../repositories/IScoreRepository";
import {IScoreServices} from "../IScoreServices";

export class ScoreServices implements IScoreServices {
    private scoreRepository: IScoreRepository;

    constructor(
        scoreRepository: IScoreRepository,
    ) {
        this.scoreRepository = scoreRepository;
    }

    async createScore(data: {
        registration: string;
        bodyScore: number;
        patternScore: number;
        colorScore: number;
        referee: string;
    }): Promise<any> {
        // Create the score
        return this.scoreRepository.createScore({
            ...data,
        });
    }

    async getScoreByRegistrationId(registrationId: string): Promise<any> {
        return this.scoreRepository.getScoreByRegistrationId(registrationId);
    }
}
