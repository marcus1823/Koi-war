import { IContestServices } from "../IContestServices";
import { IContestResponse, mapContestResponse } from "../../types/contest";
import { IContestRepository } from "../../repositories/IContestRepository";
import { IContest } from "../../models/contest.model";

export class ContestService implements IContestServices {
  private contestRepository: IContestRepository;

  constructor(contestRepository: IContestRepository) {
    this.contestRepository = contestRepository;
  }

  async getAllContests(): Promise<IContestResponse[]> {
    const contests = await this.contestRepository.getAllContests();
    return contests.map((contest) =>
      mapContestResponse(
        contest as IContest & { _id: string; createdAt: Date; updatedAt: Date }
      )
    );
  }

  async createContest(data: any): Promise<IContestResponse> {
    const contest = await this.contestRepository.createContest(data);
    return mapContestResponse(
      contest as IContest & { _id: string; createdAt: Date; updatedAt: Date }
    );
  }

  async getContestById(id: string): Promise<IContestResponse | null> {
    const contest = await this.contestRepository.getContestById(id);
    if (!contest){
      throw new Error("Contest not found");
    }
    return mapContestResponse(
      contest as IContest & { _id: string; createdAt: Date; updatedAt: Date }
    );
  }
}
