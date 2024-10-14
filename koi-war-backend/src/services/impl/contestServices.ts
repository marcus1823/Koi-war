import {IContestServices} from "../IContestServices";
import {IContestResponse, mapContestResponse} from "../../types/contest";
import {IContestRepository} from "../../repositories/IContestRepository";
import {IContest} from "../../models/contest.model";

export class ContestService implements IContestServices {
    private contestRepository: IContestRepository;

    constructor(contestRepository: IContestRepository) {
        this.contestRepository = contestRepository;
    }

    async createContest(data: any): Promise<IContestResponse> {
        const contest = await this.contestRepository.createContest(data);
        return mapContestResponse(
            contest as IContest & { _id: string; createdAt: Date; updatedAt: Date}
        )
    }
}