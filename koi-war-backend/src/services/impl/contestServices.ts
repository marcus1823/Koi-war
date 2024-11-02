import {IContestServices} from "../IContestServices";
import {IContestResponse, mapContestResponse} from "../../types/contest";
import {IContestRepository} from "../../repositories/IContestRepository";
import {IContest} from "../../models/contest.model";
import {isValidObjectId} from '../../utils/validation.utils';

export class ContestService implements IContestServices {
    private contestRepository: IContestRepository;

    constructor(contestRepository: IContestRepository) {
        this.contestRepository = contestRepository;
    }

    async getAllContests(): Promise<IContestResponse[]> {
        const contests = await this.contestRepository.getAllContests();
        if (!contests) {
            throw new Error("No contests found");
        }
        return contests.map((contest) =>
            mapContestResponse(
                contest as IContest & { _id: string; createdAt: Date; updatedAt: Date }
            )
        );
    }

    async createContest(data: any): Promise<IContestResponse> {
        const existingContest = await this.contestRepository.getContestByName(data.name);
        if (existingContest) {
            throw new Error("Contest with this name already exists");
        }

        const contest = await this.contestRepository.createContest(data);
        return mapContestResponse(
            contest as IContest & { _id: string; createdAt: Date; updatedAt: Date }
        );
    }

    async getContestById(id: string): Promise<IContestResponse | null> {
        const contest = await this.contestRepository.getContestById(id);
        if (!contest) {
            throw new Error("Contest not found");
        }
        return mapContestResponse(
            contest as IContest & { _id: string; createdAt: Date; updatedAt: Date }
        );
    }

    async getContestByName(name: string): Promise<IContestResponse | null> {
        const contest = await this.contestRepository.getContestByName(name);
        if (!contest) {
            throw new Error("Contest not found");
        }
        return mapContestResponse(
            contest as IContest & { _id: string; createdAt: Date; updatedAt: Date }
        );
    }

    async updateContestById(id: string, updateData: Partial<IContest>): Promise<IContestResponse | null> {
        const contest = await this.contestRepository.updateContest(id, updateData);
        if (!contest) {
            throw new Error("Contest not found");
        }
        if (updateData.name) {
            const existingContest = await this.contestRepository.getContestByName(updateData.name);
            if (existingContest) {
                throw new Error("Contest with this name already exists");
            }
        }
        
        return mapContestResponse(
            contest as IContest & { _id: string; createdAt: Date; updatedAt: Date }
        );
    }


    async deleteContestById(id: string): Promise<IContestResponse | null> {
        if (!isValidObjectId(id)) {
            throw new Error("Invalid contest ID format");
        }

        const hasContestInstance = await this.contestRepository.hasContestInstance(id);
        if (hasContestInstance) {
            throw new Error("Cannot delete contest with existing instances");
        }

        const contest = await this.contestRepository.deleteContest(id);
        if (!contest) {
            throw new Error("Contest not found");
        }

        return mapContestResponse(
            contest as IContest & { _id: string; createdAt: Date; updatedAt: Date }
        );
    }


}
