import {IVarietyService} from "../IVarietyService";
import {IVarietyRepository} from "../../repositories/IVarietyRepository";
import {IVarietyResponse, mapVarietyResponse} from "../../types/variety";
import {IVariety} from "../../models/variety.model";

export class VarietyServices implements IVarietyService {
    private varietyRepository: IVarietyRepository;

    constructor(varietyRepository: IVarietyRepository) {
        this.varietyRepository = varietyRepository;
    }

    async createVariety(data: any): Promise<IVarietyResponse> {
        try {
            // Check if variety with same name exists
            const existingVariety = await this.varietyRepository.findByName(data.name);
            if (existingVariety) {
                throw new Error("Variety with this name already exists");
            }

            // Xử lý images
            const processedData = {...data};
            if (typeof data.images === 'string') {
                processedData.images = [data.images];
            }

            const variety = await this.varietyRepository.createVariety(processedData);
            return mapVarietyResponse(
                variety as IVariety & { _id: string; createdAt: Date; updatedAt: Date }
            );
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Failed to create variety");
        }
    }

    async getVarietyById(id: string): Promise<IVarietyResponse> {
        const variety = await this.varietyRepository.getVarietyById(id)
        if (!variety) {
            throw new Error("Variety not found");
        }
        return mapVarietyResponse(
            variety as IVariety & { _id: string; createdAt: Date; updatedAt: Date }
        )
    }

    async getAllVarieties(): Promise<IVarietyResponse[]> {
        const varieties = await this.varietyRepository.getAllVarieties();
        return varieties.map(variety =>
            mapVarietyResponse(
                variety as IVariety & { _id: string; createdAt: Date; updatedAt: Date }
            ))
    }

    async updateVarietyById(id: string, updateData: Partial<IVariety>): Promise<IVarietyResponse> {
        try {
            // Check if variety exists
            const existingVariety = await this.varietyRepository.getVarietyById(id);
            if (!existingVariety) {
                throw new Error("Variety not found");
            }

            // If updating name, check for duplicates
            if (updateData.name) {
                const duplicateVariety = await this.varietyRepository.findByName(updateData.name);
                if (duplicateVariety && (duplicateVariety as IVariety & { _id: string })._id.toString() !== id) {
                    throw new Error("Variety with this name already exists");
                }
            }

            // Xử lý images nếu có
            const processedData = {...updateData};
            if (typeof updateData.images === 'string') {
                processedData.images = [updateData.images];
            }

            const variety = await this.varietyRepository.updateVarietyById(id, processedData);
            if (!variety) {
                throw new Error("Failed to update variety");
            }

            return mapVarietyResponse(
                variety as IVariety & { _id: string; createdAt: Date; updatedAt: Date }
            );
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Failed to update variety");
        }
    }

    async deleteVarietyById(id: string): Promise<IVarietyResponse> {
        const variety = await this.varietyRepository.deleteVarietyById(id);

        if (!variety) {
            throw new Error("Variety not found");
        } else {
            return mapVarietyResponse(
                variety as IVariety & { _id: string; createdAt: Date; updatedAt: Date }
            )
        }
    }
}