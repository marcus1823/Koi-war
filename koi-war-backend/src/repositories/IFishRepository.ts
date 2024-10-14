import {IFish} from "../models/fish.model";

export interface IFishRepository {
    createFish(data: any): Promise<IFish>;
    findFishById(id: string): Promise<IFish | null>;
    getAllFishes(): Promise<IFish[]>;
    getFishByUserId(userId: string): Promise<IFish[]>;
    getFishByVarietyId(varietyId: string): Promise<IFish[]>;
    getFishByVarietyName(varietyName: string): Promise<IFish[]>;
    deleteFishById(id: string): Promise<IFish | null>;
    updateFishById(id: string, updateData: Partial<IFish>): Promise<IFish | null>; //Partial<IFish> là một utility type có chức năng tạo ra một phiên bản mới của type IFish nhưng tất cả các thuộc tính của IFish đều là tùy chọn (optional).
}