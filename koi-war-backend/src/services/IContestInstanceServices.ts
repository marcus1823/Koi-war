import {IContestInstance} from "../models/contestInstance.model";
import {IContestInstanceResponse} from "../types/contestInstance";


export interface IContestInstanceServices {
    createContestInstance(data: any): Promise<IContestInstanceResponse>;

    getAllContestInstances(): Promise<IContestInstanceResponse[]>;

    getContestInstanceById(id: string): Promise<IContestInstanceResponse | null>;

    updateContestInstanceById(id: string, updateData: Partial<IContestInstance>): Promise<IContestInstanceResponse | null>;

    disableContestInstanceById(id: string): Promise<IContestInstanceResponse | null>;

    getEndedContestInstances(): Promise<IContestInstanceResponse[]>;

    updateContestInstanceRankedStatus(id: string): Promise<IContestInstanceResponse | null>;

    deleteContestInstanceById(id: string): Promise<IContestInstanceResponse | null>;

} 