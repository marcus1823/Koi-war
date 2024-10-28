import {IClassificationContestRuleServices} from "../IClassificationContestRuleServices";
import {IClassificationContestRuleRepository} from "../../repositories/IClassificationContestRuleRepository";
import {IContestResponse} from "../../types/contest";
import {
    IClassificationContestRuleResponse,
    mapClassificationContestRuleResponse
} from "../../types/classificationContestRule";
import {IClassificationContestRule} from "../../models/classificationContestRule.model";
import {mapContestInstanceResponse} from "../../types/contestInstance";

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

    async getAllClassificationContestRules(): Promise<IClassificationContestRuleResponse[]> {
        const classificationContestRule = await this.classificationContestRuleRepository.getAllClassificationContestRules();
        return classificationContestRule.map((classificationContestRule) =>
            mapClassificationContestRuleResponse(
                classificationContestRule as IClassificationContestRule & { _id: string; createdAt: Date; updatedAt: Date }
            )
        )
    }

    async getClassificationContestRuleById(id: string): Promise<IClassificationContestRuleResponse | null> {
        const classificationContestRule = await this.classificationContestRuleRepository.getClassificationContestRuleById(id);
        if (!classificationContestRule) {
            throw new Error("Classification contest rule not found");
        }
        return mapClassificationContestRuleResponse(
            classificationContestRule as IClassificationContestRule & { _id: string; createdAt: Date; updatedAt: Date }
        )
    }
    async updateClassificationContestRuleById(id: string, updateData: Partial<IClassificationContestRule>): Promise<IClassificationContestRuleResponse | null> {
        const classificationContestRule = await this.classificationContestRuleRepository.updateClassificationContestRuleById(id, updateData);
        if (!classificationContestRule) {
            throw new Error("Classification contest rule not found");
        }
        return mapClassificationContestRuleResponse(
            classificationContestRule as IClassificationContestRule & { _id: string; createdAt: Date; updatedAt: Date }
        )   
    }
}