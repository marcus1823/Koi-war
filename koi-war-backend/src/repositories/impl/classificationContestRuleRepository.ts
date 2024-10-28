import {IClassificationContestRuleRepository} from "../IClassificationContestRuleRepository";
import ClassificationContestRule, {IClassificationContestRule} from "../../models/classificationContestRule.model";
import ContestSubCategory, {IContestSubCategory} from "../../models/contestSubCategory.model";

export class ClassificationContestRuleRepository implements IClassificationContestRuleRepository {

    async createClassificationContestRule(data: any): Promise<IClassificationContestRule> {
        const classificationContestRule = new ClassificationContestRule(data);
        return classificationContestRule.save();
    }

   async getAllClassificationContestRules(): Promise<IClassificationContestRule[]> {
        const classificationContestRules = await ClassificationContestRule.find()
            .populate('contestSubCategory')
            .populate('varieties');
         return classificationContestRules;
   }

   async getClassificationContestRuleById(id: string): Promise<IClassificationContestRule | null> {
        const classificationContestRule = await ClassificationContestRule.findById(id)
            .populate('contestSubCategory')
            .populate('varieties');
        return classificationContestRule;
   }

   async updateClassificationContestRuleById(id: string, updateData: Partial<IClassificationContestRule>): Promise<IClassificationContestRule | null> {
       return ClassificationContestRule.findByIdAndUpdate(id, updateData, {new: true})
            .populate('contestSubCategory')
            .populate('varieties');
   }
}
