import { IContestSubCategory } from "../models/contestSubCategory.model";
import { IClassificationContestRule } from "../models/classificationContestRule.model";
export interface IClassificationContestRuleResponse {
  id: string;
  name: string;
  description?: string;
  contestSubCategory: IContestSubCategory;
  varieties: string[];
  weightRange: {
    min: number;
    max: number;
  };
  sizeRange: {
    min: number;
    max: number;
  };
  ageRange: {
    min: number;
    max: number;
  };
}

export function mapClassificationContestRuleResponse(
  classificationContestRule: IClassificationContestRule & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  }
): IClassificationContestRuleResponse {
  return {
    id: classificationContestRule._id,
    name: classificationContestRule.name,
    description: classificationContestRule.description,
    contestSubCategory: classificationContestRule.contestSubCategory,
    varieties: classificationContestRule.varieties,
    weightRange: classificationContestRule.weightRange,
    sizeRange: classificationContestRule.sizeRange,
    ageRange: classificationContestRule.ageRange,
  };
}
