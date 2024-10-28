import {IClassificationContestRule} from "../models/classificationContestRule.model";
import {IClassificationContestRuleResponse} from "../types/classificationContestRule";

export interface IClassificationContestRuleServices {
    createClassificationContestRule(data: any): Promise<IClassificationContestRuleResponse>;
    getAllClassificationContestRules(): Promise<IClassificationContestRuleResponse[]>;
    getClassificationContestRuleById(id: string): Promise<IClassificationContestRuleResponse | null>;
    getClassificationContestRuleByContestSubCategoryId(contestSubCategoryId: string): Promise<IClassificationContestRuleResponse | null>;
    updateClassificationContestRuleById(id: string, updateData: Partial<IClassificationContestRule>): Promise<IClassificationContestRuleResponse | null>;
}

