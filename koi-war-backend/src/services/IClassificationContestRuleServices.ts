import {IClassificationContestRule} from "../models/classificationContestRule.model";
import {IClassificationContestRuleResponse} from "../types/classificationContestRule";

export interface IClassificationContestRuleServices {
    createClassificationContestRule(data: any): Promise<IClassificationContestRuleResponse>;

}