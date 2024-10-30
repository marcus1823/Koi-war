import {IFishProfileResponse} from "../types/fish";
import {IFish} from "../models/fish.model";

export interface IFishService {
    createFish(data: any): Promise<IFishProfileResponse>;

    getFishById(id: string): Promise<IFishProfileResponse>;

    getAllFishes(): Promise<IFishProfileResponse[]>;

    getFishByUserId(userId: string): Promise<IFishProfileResponse[]>;

    getFishByVarietyId(varietyId: string): Promise<IFishProfileResponse[]>;

    getFishByVarietyName(varietyName: string): Promise<IFishProfileResponse[]>;

    deleteFishById(id: string): Promise<IFishProfileResponse>;

    updateFishById(id: string, updateData: Partial<IFish>): Promise<IFishProfileResponse>;
}