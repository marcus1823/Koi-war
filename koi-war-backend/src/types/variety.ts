import {IVariety} from "../models/variety.model";

export interface IVarietyResponse {
    _id: string;
    name: string;
    images?: string[];
    description: string;

}

export function mapVarietyResponse(
    variety: IVariety & { _id: string; createdAt: Date; updatedAt: Date }
): IVarietyResponse {
    return {
        _id: variety._id,
        name: variety.name,
        images: variety.images,
        description: variety.description ?? "",
    }
}

