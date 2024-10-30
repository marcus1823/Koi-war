import {IFish} from "../../models/fish.model";
import {IFishProfileResponse, mapFishProfileResponse} from "../../types/fish";
import {IFishService} from "../IFishService";
import {IFishRepository} from "../../repositories/IFishRepository";
import {IUserService} from "../IUserService";
import {IVarietyRepository} from "../../repositories/IVarietyRepository";
import * as console from "node:console";
import { IVarietyDocument } from "../../models/variety.model";

export class FishServices implements IFishService {
    private fishRepository: IFishRepository;
    private userService: IUserService
    private varietyRepository: IVarietyRepository;

    constructor(fishRepository: IFishRepository, userService: IUserService, varietyRepository: IVarietyRepository) {
        this.fishRepository = fishRepository;
        this.userService = userService;
        this.varietyRepository = varietyRepository;
    }

    async createFish(data: IFish): Promise<IFishProfileResponse> {
        const user = await this.userService.getUserByUsername(data.user.username);
        if (!user) {
            throw new Error("User not found");
        }

        const variety = await this.varietyRepository.getVarietyById(data.variety as string);
        if (!variety) {
            throw new Error("Variety not found");
        }

        const fishCreateRequest = {
            ...data,
            user,
            variety: (variety as IVarietyDocument)._id
        };

        console.log("fishCreateRequest", fishCreateRequest);
        const fish = await this.fishRepository.createFish(fishCreateRequest);
        return mapFishProfileResponse(
            fish as IFish & { _id: string; createdAt: Date; updatedAt: Date }
        )
    }

    async getFishById(id: string): Promise<IFishProfileResponse> {
        const fish = await this.fishRepository.findFishById(id);

        return mapFishProfileResponse(
            fish as IFish & { _id: string; createdAt: Date; updatedAt: Date }
        );
    }

    async getAllFishes(): Promise<IFishProfileResponse[]> {
        const fishes = await this.fishRepository.getAllFishes();
        return fishes.map(fish =>
            mapFishProfileResponse(
                fish as IFish & { _id: string; createdAt: Date; updatedAt: Date }
            ))
    }

    async getFishByUserId(userId: string): Promise<IFishProfileResponse[]> {
        const fishes = await this.fishRepository.getFishByUserId(userId);
        return fishes.map(fish =>
            mapFishProfileResponse(
                fish as IFish & { _id: string; createdAt: Date; updatedAt: Date }
            ))
    }

    async getFishByVarietyId(varietyId: string): Promise<IFishProfileResponse[]> {
        const fishes = await this.fishRepository.getFishByVarietyId(varietyId);
        return fishes.map(fish =>
            mapFishProfileResponse(
                fish as IFish & { _id: string; createdAt: Date; updatedAt: Date }
            )
        )
    }

    async getFishByVarietyName(varietyName: string): Promise<IFishProfileResponse[]> {
        const fishes = await this.fishRepository.getFishByVarietyName(varietyName);

        return fishes.map(fish =>
            mapFishProfileResponse(
                fish as IFish & { _id: string; createdAt: Date; updatedAt: Date }
            )
        )
    }

    async deleteFishById(id: string): Promise<IFishProfileResponse> {
        const fish = await this.fishRepository.deleteFishById(id);

        return mapFishProfileResponse(
            fish as IFish & { _id: string; createdAt: Date; updatedAt: Date }
        )
    }

    async updateFishById(id: string, updateData: Partial<IFish>): Promise<IFishProfileResponse> {
        if (updateData.variety) {
            const variety = await this.varietyRepository.getVarietyById(updateData.variety as string);
            if (!variety) {
                throw new Error("Variety not found");
            }
            updateData.variety = (variety as IVarietyDocument)._id;
        }

        const fish = await this.fishRepository.updateFishById(id, updateData);
        if (!fish) {
            throw new Error("Fish not found");
        }

        return mapFishProfileResponse(
            fish as IFish & { _id: string; createdAt: Date; updatedAt: Date }
        );
    }

}