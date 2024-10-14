import {IContestResponse} from "../types/contest";

export interface IContestServices {
    createContest(data: any): Promise<IContestResponse>;
}