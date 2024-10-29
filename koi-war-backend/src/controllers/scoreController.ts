import { Request, Response } from "express";
import { IScoreServices } from "../services/IScoreServices";

export class ScoreController {
  private scoreServices: IScoreServices;

  constructor(scoreServices: IScoreServices) {
    this.scoreServices = scoreServices;
  }

  createScore = async (req: Request, res: Response) => {
    try {
      const userId = req.body.user.id;
      const score = await this.scoreServices.createScore({
        ...req.body,
        referee: userId,
      });
      res.status(201).json(score);
    } catch (error) {
      if (error instanceof Error) {
        res.status(409).send(error.message);
      } else {
        res.status(409).send("An unknown error occurred");
      }
    }
  };
}
