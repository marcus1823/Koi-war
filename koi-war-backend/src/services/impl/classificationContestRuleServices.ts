import { IClassificationContestRuleServices } from "../IClassificationContestRuleServices";
import { IClassificationContestRuleRepository } from "../../repositories/IClassificationContestRuleRepository";
import { IClassificationContestRuleResponse, mapClassificationContestRuleResponse } from "../../types/classificationContestRule";
import { IClassificationContestRule } from "../../models/classificationContestRule.model";
import ContestSubCategory from "../../models/contestSubCategory.model";
import Variety from "../../models/variety.model";
import { IContestInstance } from "../../models/contestInstance.model";

export class ClassificationContestRuleService implements IClassificationContestRuleServices {
    private classificationContestRuleRepository: IClassificationContestRuleRepository;

    constructor(classificationContestRuleRepository: IClassificationContestRuleRepository) {
        this.classificationContestRuleRepository = classificationContestRuleRepository;
    }

    async createClassificationContestRule(data: any): Promise<IClassificationContestRuleResponse> {
        try {
            // Check if contestSubCategory exists
            const contestSubCategory = await ContestSubCategory.findById(data.contestSubCategory);
            if (!contestSubCategory) {
                throw new Error("Contest subcategory not found");
            }

            // Check if contestInstance is disabled
            if (contestSubCategory.contestInstance) {
                const instance = await ContestSubCategory.findById(data.contestSubCategory)
                    .populate<{ contestInstance: IContestInstance }>('contestInstance');
                if (instance?.contestInstance?.isDisabled) {
                    throw new Error("Cannot create classification rule for disabled contest instance");
                }
            }

            // Check if varieties exist
            const varieties = await Variety.find({ _id: { $in: data.varieties } });
            if (varieties.length !== data.varieties.length) {
                throw new Error("One or more varieties not found");
            }

            // Check if name already exists for this contestSubCategory
            const existingRule = await this.classificationContestRuleRepository
                .getClassificationContestRuleByContestSubCategoryId(data.contestSubCategory);
            if (existingRule) {
                throw new Error("A classification rule already exists for this contest subcategory");
            }

            const classificationContestRule = await this.classificationContestRuleRepository
                .createClassificationContestRule(data);

            return mapClassificationContestRuleResponse(
                classificationContestRule as IClassificationContestRule & {
                    _id: string;
                    createdAt: Date;
                    updatedAt: Date;
                }
            );
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
