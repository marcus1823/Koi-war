import {IUserResponse, mapUserResponse} from "./user";
import {IScore} from "../models/score.model";
import {totalScoreOfAReferee} from "../utils/expression.utils";

export interface IScoreResponse {
    _id: string;
    totalScore: number;
    bodyScore: number;
    patternScore: number;
    colorScore: number;
    judge: IUserResponse;
    createdAt: Date;
}

export function mapScoreResponse(score: IScore & { _id: string; createdAt: Date; updatedAt: Date }): {
    colorScore: number;
    createdAt: Date;
    _id: string;
    judge: IUserResponse;
    totalScore: number;
    bodyScore: number;
    patternScore: number
} {
    return {
        _id: score._id,
        totalScore: totalScoreOfAReferee(score),
        bodyScore: score.bodyScore,
        patternScore: score.patternScore,
        colorScore: score.colorScore,
        judge: mapUserResponse(score.referee),
        createdAt: score.createdAt,
    };
}