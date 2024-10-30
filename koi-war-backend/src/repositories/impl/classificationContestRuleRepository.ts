import {IClassificationContestRuleRepository} from "../IClassificationContestRuleRepository";
import ClassificationContestRule, {IClassificationContestRule,} from "../../models/classificationContestRule.model";
import mongoose from "mongoose";

export class ClassificationContestRuleRepository
    implements IClassificationContestRuleRepository {
    async createClassificationContestRule(
        data: any
    ): Promise<IClassificationContestRule> {
        const classificationContestRule = new ClassificationContestRule(data);
        return classificationContestRule.save();
    }

    async getAllClassificationContestRules(): Promise<IClassificationContestRule[]> {
        return ClassificationContestRule.find()
            .populate({
                path: 'contestSubCategory',
                populate: {
                    path: 'contestInstance'
                }
            })
            .populate('varieties');
    }

    async getClassificationContestRuleById(id: string): Promise<IClassificationContestRule | null> {
        return ClassificationContestRule.findById(id)
            .populate({
                path: 'contestSubCategory',
                populate: {
                    path: 'contestInstance'
                }
            })
            .populate('varieties');
    }

    async getClassificationContestRuleByContestSubCategoryId(
        contestSubCategoryId: string
    ): Promise<IClassificationContestRule | null> {
        return ClassificationContestRule.findOne({
            contestSubCategory: new mongoose.Types.ObjectId(contestSubCategoryId)
        })
            .populate({
                path: 'contestSubCategory',
                populate: {
                    path: 'contestInstance'
                }
            })
            .populate('varieties');
    }

    async updateClassificationContestRuleById(
        id: string,
        updateData: Partial<IClassificationContestRule>
    ): Promise<IClassificationContestRule | null> {
        return ClassificationContestRule.findByIdAndUpdate(
            id,
            updateData,
            {new: true}
        )
            .populate({
                path: 'contestSubCategory',
                populate: {
                    path: 'contestInstance'
                }
            })
            .populate('varieties');
    }
}
