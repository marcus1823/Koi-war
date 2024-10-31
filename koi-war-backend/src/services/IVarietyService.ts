import {IVarietyResponse} from "../types/variety";
import {IVariety} from "../models/variety.model";

export interface IVarietyService {
    createVariety(data: any): Promise<IVarietyResponse>;

    getVarietyById(id: string): Promise<IVarietyResponse>;

    getAllVarieties(): Promise<IVarietyResponse[]>;

    updateVarietyById(id: string, updateData: Partial<IVariety>): Promise<IVarietyResponse>;

    deleteVarietyById(id: string): Promise<IVarietyResponse>;
}