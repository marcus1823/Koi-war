import {array, number, object, string, TypeOf} from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateFishInput:
 *      type: object
 *      required:
 *        - name
 *        - weight
 *        - length
 *        - images
 *        - variety
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          default: Fish Name
 *        weight:
 *          type: number
 *          default: 5.5
 *        length:
 *          type: number
 *          default: 12.3
 *        images:
 *          type: array
 *          items:
 *            type: string
 *          default: ["image1.jpg", "image2.jpg"]
 *        variety:
 *          type: string
 *          default: Variety ID
 *        description:
 *          type: string
 *          default: A detailed description of the fish
 *    FishResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        weight:
 *          type: number
 *        length:
 *          type: number
 *        images:
 *          type: array
 *          items:
 *            type: string
 *        variety:
 *          type: string
 *        description:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */


export const createFishSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        })
            .trim()
            .min(2, "Name must be at least 2 characters long")
            .max(150, "Name must be less than 150 characters long")
            .regex(
                /^[a-zA-Z0-9\sÀ-ỹ\-_.,!?()'"]+$/u,
                "Name can only contain letters, numbers, Vietnamese characters, spaces, and basic punctuation"
            )
            .transform(val => val.replace(/\s+/g, ' ')),

        weight: number({
            required_error: "Weight is required",
        })
            .min(0.1, "Weight must be at least 0.1 kg"),

        length: number({
            required_error: "Length is required",
        })
            .min(1, "Length must be at least 1 cm"),

        images: array(string({
            required_error: "Image URL is required",
        })
            .trim()
            .url("Invalid image URL format"))
            .min(1, "At least one image is required"),

        variety: string({
            required_error: "Variety is required",
        })
            .trim()
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid Variety ID format"),

        description: string({
            required_error: "Description is required",
        })
            .trim()
            .min(8, "Description must be at least 8 characters long")
            .max(1000, "Description must be less than 1000 characters"),
    })
})

export type CreateFishInput = TypeOf<typeof createFishSchema>;