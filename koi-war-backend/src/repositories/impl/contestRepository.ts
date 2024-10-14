import {IContestRepository} from "../IContestRepository";
import Contest, {IContest} from "../../models/contest.model";

export class ContestRepository implements IContestRepository {

    async createContest(data: any): Promise<IContest> {
        const contest = new Contest(data)
        return contest.save();
    }
}