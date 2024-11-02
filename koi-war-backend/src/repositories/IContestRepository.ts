import {IContest} from "../models/contest.model";

export interface IContestRepository {
    createContest(data: any): Promise<IContest>;

    getAllContests(): Promise<IContest[]>;

    getContestByName(name: string): Promise<IContest | null>;

    getContestById(id: string): Promise<IContest | null>;

    updateContest(id: string, updateData: Partial<IContest>): Promise<IContest | null>;

    deleteContest(id: string): Promise<IContest | null>;

    hasContestInstance(id: string): Promise<boolean>;
} 
