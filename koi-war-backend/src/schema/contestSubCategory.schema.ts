import {object, string, TypeOf} from "zod";

export const createContestSubCategorySchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        description: string({
            required_error: "Description is required",
        }),
        contestInstance: string({
            required_error: "Contest Instance is required",
        })
    })
})

export type ContestSubCategoryInput = TypeOf<typeof createContestSubCategorySchema>;