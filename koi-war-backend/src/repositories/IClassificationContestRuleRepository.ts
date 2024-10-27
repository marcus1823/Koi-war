import {IClassificationContestRule} from "../models/classificationContestRule.model";

export interface IClassificationContestRuleRepository {
    createClassificationContestRule(data: any): Promise<IClassificationContestRule>;
    getAllClassificationContestRules(): Promise<IClassificationContestRule[]>;
    getClassificationContestRuleById(id: string): Promise<IClassificationContestRule | null>;
    getClassificationContestRuleByContestSubCategoryId(contestSubCategoryId: string): Promise<IClassificationContestRule | null>;
}