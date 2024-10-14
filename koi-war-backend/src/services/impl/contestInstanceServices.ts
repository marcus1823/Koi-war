import {IContestInstanceServices} from "../IContestInstanceServices";
import {IContestInstanceRepository} from "../../repositories/IContestInstanceRepository";
import {IContestInstance} from "../../models/contestInstance.model";
import {IContestInstanceResponse, mapContestInstanceResponse} from "../../types/contestInstance";

export class ContestInstanceServices implements IContestInstanceServices {
    private contestInstanceRepository: IContestInstanceRepository;

    constructor(contestInstanceRepository: IContestInstanceRepository) {
        this.contestInstanceRepository = contestInstanceRepository;
    }

    async createContestInstance(data: any): Promise<IContestInstanceResponse> {
        const contestInstance = await this.contestInstanceRepository.createContestInstance(data);
        return mapContestInstanceResponse(
            contestInstance as IContestInstance & {_id: string; createdAt: Date; updatedAt: Date}
        )
    }
}