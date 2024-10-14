import {IClassificationContestRuleServices} from "../IClassificationContestRuleServices";
import {IClassificationContestRuleRepository} from "../../repositories/IClassificationContestRuleRepository";
import {IContestResponse} from "../../types/contest";
import {
    IClassificationContestRuleResponse,
    mapClassificationContestRuleResponse
} from "../../types/classificationContestRule";
import {IClassificationContestRule} from "../../models/classificationContestRule.model";

export class ClassificationContestRuleService implements IClassificationContestRuleServices {
    private classificationContestRuleRepository: IClassificationContestRuleRepository;

    constructor(classificationContestRuleRepository: IClassificationContestRuleRepository) {
        this.classificationContestRuleRepository = classificationContestRuleRepository;
    }

    async createClassificationContestRule(data: any): Promise<IClassificationContestRuleResponse> {
        const classificationContestRule = await this.classificationContestRuleRepository.createClassificationContestRule(data);
        return mapClassificationContestRuleResponse(
            classificationContestRule as IClassificationContestRule & { _id: string; createdAt: Date; updatedAt: Date }
        )
    }
}