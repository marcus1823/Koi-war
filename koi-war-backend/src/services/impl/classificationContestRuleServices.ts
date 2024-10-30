import { IClassificationContestRuleServices } from "../IClassificationContestRuleServices";
import { IClassificationContestRuleRepository } from "../../repositories/IClassificationContestRuleRepository";
import { IClassificationContestRuleResponse, mapClassificationContestRuleResponse } from "../../types/classificationContestRule";
import { IClassificationContestRule } from "../../models/classificationContestRule.model";
import ContestSubCategory from "../../models/contestSubCategory.model";
import Variety from "../../models/variety.model";
import { IContestInstance } from "../../models/contestInstance.model";
import { IContestSubCategoryService } from "../IContestSubCategoryService";
import { IVarietyService } from "../IVarietyService";

export class ClassificationContestRuleService implements IClassificationContestRuleServices {
    private classificationContestRuleRepository: IClassificationContestRuleRepository;
    private contestSubCategoryService: IContestSubCategoryService;
    private varietyService: IVarietyService;

    constructor(
        classificationContestRuleRepository: IClassificationContestRuleRepository,
        contestSubCategoryService: IContestSubCategoryService,
        varietyService: IVarietyService
    ) {
        this.classificationContestRuleRepository = classificationContestRuleRepository;
        this.contestSubCategoryService = contestSubCategoryService;
        this.varietyService = varietyService;
    }

    async createClassificationContestRule(data: any): Promise<IClassificationContestRuleResponse> {
        try {
            // Sử dụng service thay vì truy vấn trực tiếp
            const contestSubCategory = await this.contestSubCategoryService
                .getContestSubCategoryById(data.contestSubCategory);
            if (!contestSubCategory) {
                throw new Error("Contest subcategory not found");
            }

            // Kiểm tra varieties thông qua service
            if (data.varieties) {
                for (const varietyId of data.varieties) {
                    const variety = await this.varietyService.getVarietyById(varietyId);
                    if (!variety) {
                        throw new Error(`Variety with id ${varietyId} not found`);
                    }
                }
            }

            const classificationContestRule = await this.classificationContestRuleRepository
                .createClassificationContestRule(data);

            return mapClassificationContestRuleResponse(classificationContestRule as IClassificationContestRule & {
                _id: string;
                createdAt: Date;
                updatedAt: Date;
            });
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Failed to create classification contest rule");
        }
    }

    async getAllClassificationContestRules(): Promise<IClassificationContestRuleResponse[]> {
        try {
            const rules = await this.classificationContestRuleRepository.getAllClassificationContestRules();
            return rules.map(rule => 
                mapClassificationContestRuleResponse(
                    rule as IClassificationContestRule & {
                        _id: string;
                        createdAt: Date;
                        updatedAt: Date;
                    }
                )
            );
        } catch (error) {
            throw new Error("Failed to fetch classification contest rules");
        }
    }

    async getClassificationContestRuleById(id: string): Promise<IClassificationContestRuleResponse | null> {
        const rule = await this.classificationContestRuleRepository.getClassificationContestRuleById(id);
        if (!rule) {
            throw new Error("Classification contest rule not found");
        }
        return mapClassificationContestRuleResponse(
            rule as IClassificationContestRule & {
                _id: string;
                createdAt: Date;
                updatedAt: Date;
            }
        );
    }

    async updateClassificationContestRuleById(
        id: string,
        updateData: Partial<IClassificationContestRule>
    ): Promise<IClassificationContestRuleResponse | null> {
        try {
            // Check if rule exists
            const existingRule = await this.classificationContestRuleRepository.getClassificationContestRuleById(id);
            if (!existingRule) {
                throw new Error("Classification contest rule not found");
            }

            // If updating varieties, check if they exist
            if (updateData.varieties) {
                const varieties = await Variety.find({ _id: { $in: updateData.varieties } });
                if (varieties.length !== updateData.varieties.length) {
                    throw new Error("One or more varieties not found");
                }
            }

            const updatedRule = await this.classificationContestRuleRepository
                .updateClassificationContestRuleById(id, updateData);

            if (!updatedRule) {
                throw new Error("Failed to update classification contest rule");
            }

            return mapClassificationContestRuleResponse(
                updatedRule as IClassificationContestRule & {
                    _id: string;
                    createdAt: Date;
                    updatedAt: Date;
                }
            );
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Failed to update classification contest rule");
        }
    }

    async getClassificationContestRuleByContestSubCategoryId(
      contestSubCategoryId: string
    ): Promise<IClassificationContestRuleResponse | null> {
      const classificationContestRule =
        await this.classificationContestRuleRepository.getClassificationContestRuleByContestSubCategoryId(
          contestSubCategoryId
        );
      if (!classificationContestRule) {
        return null;
      }
      return mapClassificationContestRuleResponse(
        classificationContestRule as IClassificationContestRule & {
          _id: string;
          createdAt: Date;
          updatedAt: Date;
        }
      );
    }
}
