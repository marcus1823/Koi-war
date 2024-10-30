import {IContest} from "../models/contest.model";
import {IContestInstance} from "../models/contestInstance.model";
import {IContestInstanceResponse, mapContestInstanceResponse} from "./contestInstance";

export interface IContestResponse {
    id: string;
    name: string;
    description: string;
    contestInstances: IContestInstanceResponse[];
}

export function mapContestResponse(
    contest: IContest & { _id: string; createdAt: Date; updatedAt: Date }
): IContestResponse {
    return {
        id: contest._id,
        name: contest.name,
        description: contest.description ?? "",
        contestInstances: Array.isArray(contest.contestInstances)
            ? contest.contestInstances.map(instance =>
                mapContestInstanceResponse(instance as IContestInstance & {
                    _id: string;
                    createdAt: Date;
                    updatedAt: Date
                })
            )
            : [],
    };
}
