import {IScore} from "../models/score.model";

export function totalScoreOfAReferee(score: IScore): number {
    return score.bodyScore * 0.5 + score.patternScore * 0.2 + score.colorScore * 0.3;
}