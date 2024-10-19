import {FishRepository} from "../../repositories/impl/fishRepository";
import {IFish} from "../../models/fish.model";
import {IFishProfileResponse, mapFishProfileResponse} from "../../types/fish";
import {IFishService} from "../IFishService";
import {IFishRepository} from "../../repositories/IFishRepository";
import {IUserService} from "../IUserService";

export class FishServices implements IFishService {
    private fishRepository: IFishRepository;
    private userService: IUserService

    constructor(fishRepository: IFishRepository, userService: IUserService) {
        this.fishRepository = fishRepository;
        this.userService = userService;
    }

    async createFish(data: IFish): Promise<IFishProfileResponse> {
        const user = await this.userService.getUserByUsername(data.user.username);
        if (!user) {
            throw new Error("User not found");
        }
        const fishCreateRequest = {...data, user};
        console.log("fishCreateRequest", fishCreateRequest);
        const fish = await this.fishRepository.createFish(fishCreateRequest);
        return mapFishProfileResponse(
            fish as IFish & { _id: string; createdAt: Date; updatedAt: Date}
        )
    }

    async getFishById(id: string): Promise<IFishProfileResponse> {
        const fish = await this.fishRepository.findFishById(id);

        return mapFishProfileResponse(
            fish as IFish & { _id: string; createdAt: Date; updatedAt: Date}
        );
    }

    async getAllFishes(): Promise<IFishProfileResponse[]> {
        const fishes = await  this.fishRepository.getAllFishes();
        return fishes.map(fish =>
        mapFishProfileResponse(
            fish as IFish & { _id: string; createdAt: Date; updatedAt: Date}
        ))
    }

    async getFishByUserId(userId:string): Promise<IFishProfileResponse[]> {
        const fishes = await  this.fishRepository.getFishByUserId(userId);
        return fishes.map(fish =>
        mapFishProfileResponse(
            fish as IFish & { _id: string; createdAt: Date; updatedAt: Date}
        ))
    }

    async getFishByVarietyId(varietyId:string): Promise<IFishProfileResponse[]> {
        const fishes = await  this.fishRepository.getFishByVarietyId(varietyId);
        return fishes.map(fish =>
        mapFishProfileResponse(
            fish as IFish & { _id: string; createdAt: Date; updatedAt: Date}
        )
        )
    }

    async getFishByVarietyName(varietyName:string): Promise<IFishProfileResponse[]> {
        const fishes = await this.fishRepository.getFishByVarietyName(varietyName);

        return fishes.map(fish =>
        mapFishProfileResponse(
            fish as IFish & { _id: string; createdAt: Date; updatedAt: Date}
        )
        )
    }

    async deleteFishById(id: string): Promise<IFishProfileResponse> {
           const fish = await this.fishRepository.deleteFishById(id);

           return mapFishProfileResponse(
               fish as IFish & { _id: string; createdAt: Date; updatedAt: Date}
           )
    }

    async updateFishById(id: string, updateData: Partial<IFish>): Promise<IFishProfileResponse> {
        const fish = await this.fishRepository.updateFishById(id, updateData);

       return fish as IFishProfileResponse;
    }

}