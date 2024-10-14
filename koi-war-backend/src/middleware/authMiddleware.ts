import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  const token = authHeader.split(" ")[1]; // Remove "Bearer" prefix

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    const user = verifyAccessToken(token);
    req.body = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
