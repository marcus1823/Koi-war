import { Request, Response } from "express";
import { IUserService } from "../services/IUserService";
import { CreateUserInput } from "../schema/user.schema";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  registerUser = async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response) => {
    try {
      console.log("Registering user", req.body);
      const user = await this.userService.registerUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(409).send(error.message);
      } else {
        res.status(409).send("An unknown error occurred");
      }
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };
}
