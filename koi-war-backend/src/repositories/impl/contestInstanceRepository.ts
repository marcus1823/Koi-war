import {IContestInstanceRepository} from "../IContestInstanceRepository";
import ContestInstance, {IContestInstance} from "../../models/contestInstance.model";
import Contest from "../../models/contest.model";
import ContestSubCategory from "../../models/contestSubCategory.model";


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
        try {
            const contestInstances = await ContestInstance.find()
                .populate("contest")
                .populate({
                    path: 'contestSubCategories',
                    populate: {
                        path: 'classificationContestRule'
                    }
                });

            // Cập nhật contestSubCategories cho mỗi instance
            const updatedInstances = await Promise.all(
                contestInstances.map(async (instance) => {
                    const subCategories = await ContestSubCategory.find({
                        contestInstance: instance._id
                    }).populate('classificationContestRule');
                    
                    instance.contestSubCategories = subCategories;
                    return instance;
                })
            );

            return updatedInstances;
        } catch (error) {
            throw new Error("Failed to fetch contest instances");
        }
    }

    async getContestInstanceById(id: string): Promise<IContestInstance | null> {
        // Lấy tất cả contestSubCategories thuộc về contestInstance này
        const subCategories = await ContestSubCategory.find({ 
            contestInstance: id 
        }).populate('classificationContestRule');

        const contestInstance = await ContestInstance.findById(id)
            .populate("contest")
            .populate({
                path: 'contestSubCategories',
                populate: {
                    path: 'classificationContestRule'
                }
            });

        if (contestInstance) {
            // Cập nhật lại danh sách contestSubCategories
            contestInstance.contestSubCategories = subCategories;
            await contestInstance.save();
        }

        return contestInstance;
    }

    async updateContestInstanceById(id: string, updateData: Partial<IContestInstance>): Promise<IContestInstance | null> {
        const updatedInstance = await ContestInstance.findByIdAndUpdate(
            id, 
            updateData, 
            {new: true}
        )
        .populate("contest")
        .populate({
            path: 'contestSubCategories',
            populate: {
                path: 'classificationContestRule'
            }
        });

        if (updatedInstance) {
            // Cập nhật lại danh sách contestSubCategories
            const subCategories = await ContestSubCategory.find({
                contestInstance: id
            }).populate('classificationContestRule');
            
            updatedInstance.contestSubCategories = subCategories;
            await updatedInstance.save();
        }

        return updatedInstance;
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
