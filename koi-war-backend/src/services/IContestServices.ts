import {IContestResponse} from "../types/contest";

export interface IContestServices {
    createContest(data: any): Promise<IContestResponse>;
    getAllContests(): Promise<IContestResponse[]>;
    getContestById(id: string): Promise<IContestResponse | null>;
}