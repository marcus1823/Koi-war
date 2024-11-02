import {IScore} from "../models/score.model";

export interface IScoreRepository {
    createScore(data: {
        registration: string;
        bodyScore: number;
        patternScore: number;
        colorScore: number;
        referee: string;
    }): Promise<any>;

    getScoreByRegistrationId(registrationId: string): Promise<(IScore & { _id: string })[]>;
}
