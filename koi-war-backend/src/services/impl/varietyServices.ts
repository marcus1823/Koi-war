import {IVarietyService} from "../IVarietyService";
import {IVarietyRepository} from "../../repositories/IVarietyRepository";
import {IFish} from "../../models/fish.model";
import {IVarietyResponse, mapVarietyResponse} from "../../types/variety";
import {IVariety} from "../../models/variety.model";
import {mapFishProfileResponse} from "../../types/fish";

export class VarietyServices implements IVarietyService {
    private varietyRepository: IVarietyRepository;

    constructor(varietyRepository: IVarietyRepository) {
        this.varietyRepository = varietyRepository;
    }
    async createVariety(data: any): Promise<IVarietyResponse> {
        const variety = await this.varietyRepository.createVariety(data);
        return mapVarietyResponse(
            variety as IVariety & { _id: string; createdAt: Date; updatedAt: Date}
        )
    }

    async getVarietyById(id: string): Promise<IVarietyResponse> {
        const variety = await this.varietyRepository.getVarietyById(id)
        if (!variety) {
            throw new Error("Variety not found");
        }
        return mapVarietyResponse(
            variety as IVariety & { _id: string; createdAt: Date; updatedAt: Date}
        )
    }

    async getAllVarieties(): Promise<IVarietyResponse[]> {
        const varieties = await this.varietyRepository.getAllVarieties();
        return varieties.map(variety =>
            mapVarietyResponse(
                variety as IVariety & { _id: string; createdAt: Date; updatedAt: Date}
            ))
    }

    async updateVarietyById(id: string, updateData: Partial<IVariety>): Promise<IVarietyResponse> {
        const variety = await this.varietyRepository.updateVarietyById(id, updateData);
        if (!variety) {
            throw new Error("Variety not found");
        }

        return mapVarietyResponse(
            variety as IVariety & { _id: string; createdAt: Date; updatedAt: Date }
        );
    }

    async deleteVarietyById(id: string): Promise<IVarietyResponse> {
        const variety = await this.varietyRepository.deleteVarietyById(id);

        if (!variety) {
            throw new Error("Variety not found");
        }else {
            return mapVarietyResponse(
                variety as IVariety & { _id: string; createdAt: Date; updatedAt: Date}
            )
        }
    }
}