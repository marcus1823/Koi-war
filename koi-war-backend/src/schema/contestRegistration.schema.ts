import {object, string} from "zod";

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
