import { NextFunction, Request, Response } from 'express';
import { UserRole } from "../models/user.model";
import { verifyToken } from "./authMiddleware";

export function authorizeRole(
  roles: UserRole[],
  req: Request,
  res: Response,
  next: NextFunction
): void {
  verifyToken(req, res, () => {
    const userRole = req.body.role;
    if (!roles.includes(userRole)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  });
}
