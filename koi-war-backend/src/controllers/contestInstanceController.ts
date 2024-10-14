import {IContestInstanceServices} from "../services/IContestInstanceServices";
import { Request, Response } from "express";
import {ContestInstanceInput} from "../schema/contestInstance.schema";

export class ContestInstanceController {
    private contestInstanceService: IContestInstanceServices;

    constructor(contestInstanceService: IContestInstanceServices) {
        this.contestInstanceService = contestInstanceService;
    }

    createContestInstance = async (
        req: Request<{}, {}, ContestInstanceInput>,
        res: Response,
    )=> {
        try {
            const contestInstance = await this.contestInstanceService.createContestInstance(req.body);
            res.status(201).json(contestInstance);
        } catch (error) {
            if (error instanceof Error) {
                res.status(409).send(error.message);
            } else {
                res.status(409).send("An unknown error occurred");
            }
        }
    }
}