import {object, string, TypeOf} from "zod";

export const createContestSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        description: string({
            required_error: "Description is required",
        }).min(8,"Description must be at least 8 characters"),
    })

})

export type CreateContestInput = TypeOf<typeof createContestSchema>;