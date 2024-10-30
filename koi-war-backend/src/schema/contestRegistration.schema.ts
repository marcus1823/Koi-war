import { object, string, enum as zodEnum } from "zod";
import { RegistrationStatus } from "../models/registration.model";

export const CreateContestRegistrationInput = object({
    body: object({
        fish: string({
            required_error: "Fish is required",
        }),
        contestInstance: string({
            required_error: "Contest Instance is required",
        }),
        contestSubCategory: string({
            required_error: "Contest Sub Category is required",
        }),
    }),
});

export const UpdateRegistrationStatusInput = object({
  body: object({
    status: zodEnum([
      RegistrationStatus.PENDING,
      RegistrationStatus.APPROVED,
      RegistrationStatus.CHECKED,
      RegistrationStatus.REJECTED
    ], {
      required_error: "Status is required",
      invalid_type_error: "Invalid status value"
    })
  })
});