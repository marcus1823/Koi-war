import {IVarietyRepository} from "../IVarietyRepository";
import Variety, {IVariety} from "../../models/variety.model";

export class VarietyRepository implements IVarietyRepository  {

        async createVariety(data: any): Promise<IVariety> {
            const variety = new Variety(data);
            return variety.save();
        }

        async getVarietyById(id: string): Promise<IVariety | null> {
            return Variety.findById(id);
        }

        async getAllVarieties(): Promise<IVariety[]> {
            return Variety.find();
        }

        async updateVarietyById(id: string, updateData: Partial<IVariety>): Promise<IVariety | null> {
            return Variety.findByIdAndUpdate(id, updateData, {new: true})
        }

        async deleteVarietyById(id: string): Promise<IVariety | null> {
            return Variety.findByIdAndDelete(id)
        }

        async findByName(name: string): Promise<IVariety | null> {
            return Variety.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        }
}