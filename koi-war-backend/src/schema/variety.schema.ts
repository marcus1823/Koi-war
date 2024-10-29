import { array, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateVarietyInput:
 *      type: object
 *      required:
 *        - name
 *        - images
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          default: Variety Name
 *        images:
 *          type: array
 *          items:
 *            type: string
 *          default: ["image1.jpg", "image2.jpg"]
 *        description:
 *          type: string
 *          default: Description of the variety
 *    VarietyResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        images:
 *          type: array
 *          items:
 *            type: string
 *        description:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createVarietySchema = object({
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

        images: array(
            string({
                required_error: "Image URL is required",
            })
            .trim()
            .url("Invalid image URL format")
        ).min(1, "At least one image is required"),

        description: string({
            required_error: "Description is required",
        })
        .trim()
        .min(8, "Description must be at least 8 characters long")
        .max(1000, "Description must be less than 1000 characters"),
    })
});

export const updateVarietySchema = object({
    params: object({
        id: string()
            .trim()
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid Variety ID format"),
    }),
    body: object({
        name: string()
            .trim()
            .min(2, "Name must be at least 2 characters long")
            .max(150, "Name must be less than 150 characters long")
            .regex(
                /^[a-zA-Z0-9\sÀ-ỹ\-_.,!?()'"]+$/u,
                "Name can only contain letters, numbers, Vietnamese characters, spaces, and basic punctuation"
            )
            .transform(val => val.replace(/\s+/g, ' '))
            .optional(),

        images: array(
            string()
                .trim()
                .url("Invalid image URL format")
        )
        .min(1, "At least one image is required")
        .optional(),

        description: string()
            .trim()
            .min(8, "Description must be at least 8 characters long")
            .max(1000, "Description must be less than 1000 characters")
            .optional(),
    })
});

export type CreateVarietyInput = TypeOf<typeof createVarietySchema>;
export type UpdateVarietyInput = TypeOf<typeof updateVarietySchema>;