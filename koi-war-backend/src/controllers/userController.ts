import { Request, Response } from "express";
import { userServices } from "../services/userServices";

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await userServices.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const userController = { registerUser };
