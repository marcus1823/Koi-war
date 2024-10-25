import {IContestInstanceRepository} from "../IContestInstanceRepository";
import ContestInstance, {IContestInstance} from "../../models/contestInstance.model";

export class ContestInstanceRepository implements IContestInstanceRepository {
    async createContestInstance(data: any): Promise<IContestInstance> {
        const contestInstance = new ContestInstance(data);
        return contestInstance.save();
    }

    async getAllContestInstances(): Promise<IContestInstance[]> {
        return ContestInstance.find();
    }
}