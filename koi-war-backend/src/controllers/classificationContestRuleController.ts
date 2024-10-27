import { IClassificationContestRuleServices } from "../services/IClassificationContestRuleServices";
import { Request, Response } from "express";
import { ClassificationContestRuleInput } from "../schema/classificationContestRule.schema";

export class ClassificationContestRuleController {
  private classificationContestRuleService: IClassificationContestRuleServices;

  constructor(
    classificationContestRuleService: IClassificationContestRuleServices
  ) {
    this.classificationContestRuleService = classificationContestRuleService;
  }

  createClassificationContestRule = async (
    req: Request<{}, {}, ClassificationContestRuleInput>,
    res: Response
  ) => {
    try {
      const classificationContestRule =
        await this.classificationContestRuleService.createClassificationContestRule(
          req.body
        );
      res.status(201).json(classificationContestRule);
    } catch (error) {
      if (error instanceof Error) {
        res.status(409).send(error.message);
      } else {
        res.status(409).send("An unknown error occurred");
      }
    }
  };

  getAllClassificationContestRules = async (req: Request, res: Response) => {
    try {
      const classificationContestRule =
        await this.classificationContestRuleService.getAllClassificationContestRules();
      res.status(200).json(classificationContestRule);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("An unknown error occurred");
      }
    }
  };

  getClassificationContestRuleById = async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    try {
      const classificationContestRule =
        await this.classificationContestRuleService.getClassificationContestRuleById(
          req.params.id
        );
      res.status(200).json(classificationContestRule);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("An unknown error occurred");
      }
    }
  };

  getClassificationContestRuleByContestSubCategoryId = async (
    req: Request<{ contestSubCategoryId: string }>,
    res: Response
  ) => {
    try {
      const classificationContestRule =
        await this.classificationContestRuleService.getClassificationContestRuleByContestSubCategoryId(
          req.params.contestSubCategoryId
        );
      res.status(200).json(classificationContestRule);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("An unknown error occurred");
      }
    }
  };
}
