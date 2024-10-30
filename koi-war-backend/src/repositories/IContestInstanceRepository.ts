import {IContestInstance} from "../models/contestInstance.model";

export interface IContestInstanceRepository {
    createContestInstance(data: any): Promise<IContestInstance>;

    getAllContestInstances(): Promise<IContestInstance[]>;

    getContestInstanceById(id: string): Promise<IContestInstance | null>;

    updateContestInstanceById(id: string, updateData: Partial<IContestInstance>): Promise<IContestInstance | null>;

    disableContestInstanceById(id: string): Promise<IContestInstance | null>;

    getEndedContestInstances(): Promise<IContestInstance[]>;

    updateContestInstanceRankedStatus(id: string): Promise<IContestInstance | null>;
}