import {IVariety} from "../models/variety.model";

export interface IVarietyRepository {
    createVariety(data: any): Promise<IVariety>;
    getVarietyById(id: string): Promise<IVariety | null>;
    getAllVarieties(): Promise<IVariety[]>;
    updateVarietyById(id: string, updateData: Partial<IVariety>): Promise<IVariety | null>;
    deleteVarietyById(id: string): Promise<IVariety | null>;
    findByName(name: string): Promise<IVariety | null>;
}