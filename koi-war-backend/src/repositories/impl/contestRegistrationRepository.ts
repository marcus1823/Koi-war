import Registration from "../../models/registration.model";
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

    getContestRegistrationByFishId(fishId: string): Promise<any> {
        return Registration.findOne({fish: fishId})
            .populate("scores")
            .populate("contestInstance")
            .populate("contestSubCategory")
            .populate("fish");
    }
}
