import { IContestRepository } from "../IContestRepository";
import Contest, { IContest } from "../../models/contest.model";

export class ContestRepository implements IContestRepository {
  async getAllContests(): Promise<IContest[]> {
    const contests = await Contest.find();
    return contests;
  }

  async createContest(data: any): Promise<IContest> {
    const contest = new Contest(data);
    return contest.save();
  }
}
