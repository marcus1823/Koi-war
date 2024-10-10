import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next(); // Call next() to pass control to the next middleware/controller
    } catch (error: any) {
      // Return a response if validation fails
      res.status(400).json({
        error: error.errors,
      });
    }
  };
};
