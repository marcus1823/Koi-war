import {IClassificationContestRuleServices} from "../services/IClassificationContestRuleServices";
import {Request, Response} from "express";
import {ClassificationContestRuleInput} from "../schema/classificationContestRule.schema";


export class ClassificationContestRuleController {
    private classificationContestRuleService: IClassificationContestRuleServices;

    constructor(classificationContestRuleService: IClassificationContestRuleServices) {
        this.classificationContestRuleService = classificationContestRuleService;
    }

    createClassificationContestRule = async (
        req: Request<{}, {}, ClassificationContestRuleInput>,
        res: Response
    )=> {
        try {
            const classificationContestRule = await this.classificationContestRuleService.createClassificationContestRule(req.body);
            res.status(201).json(classificationContestRule);
        } catch (error) {
            if (error instanceof Error) {
                res.status(409).send(error.message);
            } else {
                res.status(409).send("An unknown error occurred");
            }
        }
    }
}