import { Request, Response } from "express";
import { IContestRegistrationServices } from "../services/IContestRegistrationServices";

export class ContestRegistrationController {
  private contestRegistrationServices: IContestRegistrationServices;

  constructor(contestRegistrationServices: IContestRegistrationServices) {
    this.contestRegistrationServices = contestRegistrationServices;
  }

  registerContest = async (req: Request, res: Response) => {
    try {
      const { contestInstanceId, contestSubCategoryId, fishProfileId } =
        req.params;
      const username = req.body.username;
      await this.contestRegistrationServices.registerContest(
        username,
        contestInstanceId,
        contestSubCategoryId,
        fishProfileId
      );
      res.status(201).send("Contest registration successful");
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      } else {
        res.status(400).send("An unknown error occurred");
      }
    }
  };
}
