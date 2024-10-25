import { IContestRepository } from "../IContestRepository";
import Contest, { IContest } from "../../models/contest.model";

export class ContestRepository implements IContestRepository {

  async createContest(data: any): Promise<IContest> {
    const contest = new Contest(data);
    return contest.save();
  }

  async getAllContests(): Promise<IContest[]> {
    const contests = await Contest.find();
    return contests;
  }

  async getContestById(id: string): Promise<IContest | null> {
    const contest = await Contest.findById(id);
    return contest;
  }
}
