import {IContestRepository} from "../IContestRepository";
import Contest, {IContest} from "../../models/contest.model";
import {isValidObjectId} from '../../utils/validation.utils';

export class ContestRepository implements IContestRepository {

    async createContest(data: any): Promise<IContest> {
        const contest = new Contest(data);
        return contest.save();
    }

    async getAllContests(): Promise<IContest[]> {
        const contests = await Contest.find().populate({
            path: 'contestInstances',
            model: 'ContestInstance'
        });
        return contests;
    }

    async getContestById(id: string): Promise<IContest | null> {
        if (!isValidObjectId(id)) {
            return null;
        }
        const contest = await Contest.findById(id).populate({
            path: 'contestInstances',
            model: 'ContestInstance'
        });
        return contest;
    }

    async getContestByName(name: string): Promise<IContest | null> {
        const contest = await Contest.findOne({name})
            .populate({
                path: 'contestInstances',
                model: 'ContestInstance'
            });
        return contest;
    }

    async updateContest(id: string, updateData: Partial<IContest>): Promise<IContest | null> {
        return Contest.findByIdAndUpdate(id, updateData, {new: true}).populate("contestInstances");
    }

    async deleteContest(id: string): Promise<IContest | null> {
        if (!isValidObjectId(id)) {
            return null;
        }
        return Contest.findByIdAndDelete(id);
    }

    async hasContestInstance(id: string): Promise<boolean> {
        if (!isValidObjectId(id)) {
            return false;
        }
        const contest = await Contest.findById(id);
        return contest ? contest.contestInstances.length > 0 : false;
    }
}
 
