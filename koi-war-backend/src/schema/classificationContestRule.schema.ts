import {array, object, string, TypeOf} from "zod";

export const createClassificationContestRuleSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        description: string({
            required_error: "Description is required",
        }),
        contestSubCategory: string({
            required_error: "Contest Sub Category is required",
        }),
        varieties: array(string({
            required_error: "Varieties is required",
        }))
    })
})


export type ClassificationContestRuleInput = TypeOf<typeof createClassificationContestRuleSchema>;