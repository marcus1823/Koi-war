import {IClassificationContestRule} from "../models/classificationContestRule.model";

export interface IClassificationContestRuleRepository {
    createClassificationContestRule(data: any): Promise<IClassificationContestRule>;
}