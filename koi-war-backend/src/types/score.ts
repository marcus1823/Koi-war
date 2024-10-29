import {IUserResponse, mapUserResponse} from "./user";
import {IScore} from "../models/score.model";

export interface IScoreResponse {
    _id: string;
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
    judge: IUserResponse & { _id: string };
    bodyScore: number;
    patternScore: number
} {
    return {
        _id: score._id,
        bodyScore: score.bodyScore,
        patternScore: score.patternScore,
        colorScore: score.colorScore,
        judge: mapUserResponse(score.referee),
        createdAt: score.createdAt,
    };
}