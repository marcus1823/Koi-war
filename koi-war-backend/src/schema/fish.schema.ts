import {array, number, object, string, TypeOf} from "zod";

export const createFishSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        weight: number({
           required_error: "Weight is required",
        }),
        length: number( {
            required_error: "Length is required",
        }),
        images: array(string({
            required_error: "Image is required",
        })),
        variety: string({
            required_error: "Variety is required",
        }),

        description: string({
            required_error: "Description is required",
        }).min(8,"Description must be at least 8 characters"),
    })
})

export type CreateFishInput = TypeOf<typeof createFishSchema>;