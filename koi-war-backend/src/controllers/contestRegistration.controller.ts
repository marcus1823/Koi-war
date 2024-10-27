import { Request, Response } from "express";
import { IContestRegistrationServices } from "../services/IContestRegistrationServices";

export class ContestRegistrationController {
  private contestRegistrationService: IContestRegistrationServices;

  constructor(contestRegistrationService: IContestRegistrationServices) {
    this.contestRegistrationService = contestRegistrationService;
  }

  createContestRegistration = async (req: Request, res: Response) => {
    try {
      const contestRegistration =
        await this.contestRegistrationService.createContestRegistration(
          req.body
        );
      res.status(201).json(contestRegistration);
    } catch (error) {
      if (error instanceof Error) {
        res.status(409).send(error.message);
      } else {
        res.status(409).send("An unknown error occurred");
      }
    }
  };
}
