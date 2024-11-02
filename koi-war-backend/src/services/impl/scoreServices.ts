import {IScore} from "../../models/score.model";
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

    async getScoreByRegistrationId(registrationId: string): Promise<(IScore & { _id: string })[]> {
        return this.scoreRepository.getScoreByRegistrationId(registrationId);
    }

    async checkRefereeIsScored(registrationId: string, refereeId: string): Promise<boolean> {
        const scores = await this.getScoreByRegistrationId(registrationId);

        if (scores.length == 0) {
            return false;
        }

        return scores.some(score => score.referee._id.toString() === refereeId);
    }
}
