import {IContest} from "../models/contest.model";

export interface IContestResponse {
    name: string;
    description: string;
}

export function mapContestResponse(
    contest: IContest & { _id: string; createdAt: Date, updatedAt: Date }
): IContestResponse{
    return {
        name: contest.name,
        description: contest.description ?? "",
    }
}