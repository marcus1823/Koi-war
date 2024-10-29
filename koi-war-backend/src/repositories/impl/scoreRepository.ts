import Score from "../../models/score.model";
import {IScoreRepository} from "../IScoreRepository";

export class ScoreRepository implements IScoreRepository {
    async createScore(data: {
        registration: string;
        bodyScore: number;
        patternScore: number;
        colorScore: number;
        referee: string;
    }): Promise<any> {
        const score = new Score(data);
        return score.save();
    }

    async getScoreByRegistrationId(registrationId: string): Promise<any> {
        return Score.find({registration: registrationId});
    }
}
