import { number, object, string } from "zod";

export const CreateScoreInput = object({
  body: object({
    registration: string({
      required_error: "Registration must be a string",
    }).min(1, { message: "Registration is required" }),
    bodyScore: number({
      required_error: "Body Score must be a number",
    })
      .min(0, { message: "Body Score must be greater than or equal to 0" })
      .max(10, { message: "Body Score must be less than or equal to 10" }),
    patternScore: number({
      required_error: "Pattern Score must be a number",
    })
      .min(0, { message: "Pattern Score must be greater than or equal to 0" })
      .max(10, { message: "Pattern Score must be less than or equal to 10" }),
    colorScore: number({
      required_error: "Color Score must be a number",
    })
      .min(0, { message: "Color Score must be greater than or equal to 0" })
      .max(10, { message: "Color Score must be less than or equal to 10" }),
  }),
});
