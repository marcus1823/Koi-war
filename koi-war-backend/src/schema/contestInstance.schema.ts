import {boolean, date, object, string, TypeOf} from "zod";

export const createContestInstanceSchema = object({
    body: object({
        contest: string({
            required_error: "Contest is required",
        }),
        startDate: date({
            required_error: "StartDate is required",
        }),
        endDate: date({
            required_error: "EndDate is required",
        }),
        isActive: boolean({
            required_error: "Active is required",
        }),
        description: string({
            required_error: "Description is required",
        }).min(8,"Description must be at least 8 characters"),
        rules: string({
            required_error: "Rules is required",
        }),
        images: string({
            required_error: "Image is required",
        })
    })
})

export type ContestInstanceInput = TypeOf<typeof createContestInstanceSchema>;