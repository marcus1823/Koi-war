import Registration, {IRegistration, RegistrationStatus} from "../../models/registration.model";
import {IContestRegistrationRepository} from "../IContestRegistrationRepository";

export class ContestRegistrationRepository
    implements IContestRegistrationRepository {
    async createContestRegistration(data: {
        fish: string;
        contestInstance: string;
        contestSubCategory: string;
    }): Promise<any> {
        // Create a new contest registration
        const contestRegistration = new Registration(data);
        return contestRegistration.save();
    }

    async getContestRegistrationById(id: string): Promise<any> {
        return Registration.findById(id);
    }

    async getAllContestRegistration(): Promise<(IRegistration & { _id: string })[]> {
        const result = await Registration.find()
            .populate("scores")
            .populate("contestInstance")
            .populate("contestSubCategory")
            .populate("fish")
            .lean();
            
        return result as unknown as (IRegistration & { _id: string })[];
    }

    getContestRegistrationByFishId(fishId: string): Promise<any> {
        return Registration.findOne({fish: fishId})
            .populate("scores")
            .populate("contestInstance")
            .populate("contestSubCategory")
            .populate("fish");
    }

    getContestRegistrationsBySubCategoryId(
        contestSubCategoryId: string
    ): Promise<any[]> {
        return Registration.find({contestSubCategory: contestSubCategoryId})
            .populate("scores")
            .populate("contestInstance")
            .populate("contestSubCategory")
            .populate("fish");
    }

    async updateContestRegistrationRank(
        registrationId: string,
        rank: number
    ): Promise<any> {
        return await Registration.findByIdAndUpdate(
            registrationId,
            {rank},
            {new: true}
        );
    }

    async updateContestRegistrationStatus(id: string, status: RegistrationStatus): Promise<any> {
        return Registration.findByIdAndUpdate(id, {status}, {new: true})
            .populate("scores")
            .populate("contestInstance")
            .populate("contestSubCategory")
            .populate("fish");
    }
}
