import {IContestInstanceServices} from "../services/IContestInstanceServices";
import { Request, Response } from "express";
import {ContestInstanceInput} from "../schema/contestInstance.schema";
import { IContestInstance } from "../models/contestInstance.model";

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

    getAllContestInstances = async (
        req: Request,
        res: Response
    )=> {
        try {
            const contestInstances = await this.contestInstanceService.getAllContestInstances();
            res.status(200).json(contestInstances);
        }catch(error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

    getContestInstanceById = async (
        req: Request<{id: string}>,
        res: Response,
    ) => {
        try {
            const contestInstance = await this.contestInstanceService.getContestInstanceById(req.params.id);
            if (!contestInstance) {
                res.status(404).json({message: "Contest instance not found"});
            } else {
                res.status(200).json(contestInstance);
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }
    }

    updateContestInstanceById = async (
        req: Request<{id: string}, {}, Partial<IContestInstance>>,
        res: Response,
    ) => {
        try {
            const updateContestInstance = await this.contestInstanceService.updateContestInstanceById(req.params.id, req.body);
            res.status(200).json(updateContestInstance);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("An unknown error occurred");
            }
        }   
    }   

    disableContestInstance = async (
        req: Request<{id: string}>,
        res: Response,
      ) => {
        try {
          const disabledContestInstance = await this.contestInstanceService.disableContestInstanceById(req.params.id);
          if (!disabledContestInstance) {
            res.status(404).json({message: "Contest instance not found"});
          } else {
            res.status(200).json({message: "Contest instance disabled successfully", contestInstance: disabledContestInstance});
          }
        } catch (error) {
          if (error instanceof Error) {
            if (error.message === "Contest has already started or is ongoing, cannot disable") {
              res.status(400).json({message: error.message});
            } else {
              res.status(500).send(error.message);
            }
          } else {
            res.status(500).send("An unknown error occurred");
          }
        }
      }
}
