import Fish, {IFish} from "../../models/fish.model";
import {IFishRepository} from "../IFishRepository";
import Variety from "../../models/variety.model";

export class FishRepository implements IFishRepository{

    async createFish(data: any): Promise<IFish>{
        const fish = new Fish(data);
        return fish.save();
    }

    async findFishById(id: string): Promise<IFish | null> {
        return Fish.findById(id)
            .populate("variety")
            .populate("user")
            .exec();
    }

    async getAllFishes(): Promise<IFish[]> {
        return Fish.find()
            .populate("variety")
            .populate("user")
            .exec();
    }

    async getFishByUserId(userId: string): Promise<IFish[]> {
        return Fish.find({user: userId})
            .populate("variety")
            .populate("user")
            //.populate("user", "username email") <nếu muốn hiện thị field cụ thể nào thì ở đây nha>
            .exec();
    }

    async getFishByVarietyId(varietyId: string): Promise<IFish[]> {
        return Fish.find({variety: varietyId}).populate("variety").exec()
    }

    async getFishByVarietyName(varietyName: string): Promise<IFish[]> {
        // Tìm variety dựa vào varietyName
        const variety = await Variety.findOne({name: varietyName})
        if (!variety) return [];

        // Sử dụng ObjectId để tìm cá
        return Fish.find({ variety: variety._id }).populate("variety").exec()
    }

    async deleteFishById(id: string): Promise<IFish | null> {
        return Fish.findByIdAndDelete(id);
    }

    //Partial<IFish> là một utility type có chức năng tạo ra một phiên bản mới của type IFish nhưng tất cả các thuộc tính của IFish đều là tùy chọn (optional).
    async updateFishById(id: string, updateData: Partial<IFish>) : Promise<IFish | null> {
        return Fish.findByIdAndUpdate(id, updateData, {new: true})
            .populate("variety")
            .populate("user")
            .exec()
    }

}