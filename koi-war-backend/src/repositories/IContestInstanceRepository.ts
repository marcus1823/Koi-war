import {IContestInstance} from "../models/contestInstance.model";

export interface IContestInstanceRepository {
    createContestInstance(data: any): Promise<IContestInstance>;
}