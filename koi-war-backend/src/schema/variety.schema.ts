import {array, object, string, TypeOf} from "zod";

export const createVarietySchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        images: string({
            required_error: "Image is required",
        }),
        description: string({
            required_error: "Description is required",
        }).min(3,"Description must be at least 3 characters"),
    })
})



export type CreateVarietyInput = TypeOf<typeof createVarietySchema>;