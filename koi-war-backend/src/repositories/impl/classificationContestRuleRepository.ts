import {IClassificationContestRuleRepository} from "../IClassificationContestRuleRepository";
import ClassificationContestRule, {IClassificationContestRule} from "../../models/classificationContestRule.model";

export class ClassificationContestRuleRepository implements IClassificationContestRuleRepository {
    async createClassificationContestRule(data: any): Promise<IClassificationContestRule> {
        const classificationContestRule = new ClassificationContestRule(data);
        return classificationContestRule.save();
    }
}