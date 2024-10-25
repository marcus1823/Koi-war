
import {IContestInstanceResponse} from "../types/contestInstance";


export interface IContestInstanceServices {
    createContestInstance(data: any): Promise<IContestInstanceResponse>;
    getAllContestInstances(): Promise<IContestInstanceResponse[]>;
    getContestInstanceById(id: string): Promise<IContestInstanceResponse | null>;
}