import {IContestInstanceRepository} from "../IContestInstanceRepository";
import ContestInstance, {IContestInstance} from "../../models/contestInstance.model";
import Contest from "../../models/contest.model";


export class ContestInstanceRepository implements IContestInstanceRepository {
    async createContestInstance(data: any): Promise<IContestInstance> {
        const contestInstance = new ContestInstance(data);
        const savedInstance = await contestInstance.save();

        // Add reference to Contest
        await Contest.findByIdAndUpdate(
            data.contest,
            { $push: { contestInstances: savedInstance._id } },
            { new: true }
        );

        return savedInstance;
    }

    async getAllContestInstances(): Promise<IContestInstance[]> {
        const contestInstances = await ContestInstance.find()
            .populate("contest");
        return contestInstances;
    }

    async getContestInstanceById(id: string): Promise<IContestInstance | null> {
        const contestInstance = await ContestInstance.findById(id)
            .populate("contest");
        return contestInstance;
    }

    async updateContestInstanceById(id: string, updateData: Partial<IContestInstance>): Promise<IContestInstance | null> {
        return ContestInstance.findByIdAndUpdate(id, updateData, {new: true})
            .populate("contest");
    }

    async disableContestInstanceById(id: string): Promise<IContestInstance | null> {
       const now = new Date();
       const contestInstance = await ContestInstance.findById(id);
       if (!contestInstance) {
        return null;
       }

       if (contestInstance.startDate <= now ) {
        throw new Error("Contest has already started or is ongoing, cannot disable");
       }

       contestInstance.isDisabled = true;
       return await contestInstance.save();
    }
}
