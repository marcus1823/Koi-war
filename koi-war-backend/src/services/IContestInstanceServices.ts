
import {IContestInstanceResponse} from "../types/contestInstance";


export interface IContestInstanceServices {
    createContestInstance(data: any): Promise<IContestInstanceResponse>;
}