import { IContest } from "../models/contest.model";
import {IContestResponse} from "../types/contest";

export interface IContestServices {
    createContest(data: any): Promise<IContestResponse>;
    getAllContests(): Promise<IContestResponse[]>;
    getContestById(id: string): Promise<IContestResponse | null>;
    updateContestById(id: string, updateData: Partial<IContest>): Promise<IContestResponse | null>;
    deleteContestById(id: string): Promise<IContestResponse | null>;
}