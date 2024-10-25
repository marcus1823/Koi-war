import {IContest} from "../models/contest.model";

export interface IContestRepository {
    createContest(data: any): Promise<IContest>;
    getAllContests(): Promise<IContest[]>;
}