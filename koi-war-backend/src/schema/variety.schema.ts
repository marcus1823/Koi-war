import { object, string, TypeOf, union, array } from "zod";

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
        name: string()
            .trim()
            .min(2, "Name must be at least 2 characters long")
            .max(150, "Name must be less than 150 characters long")
            .regex(
                /^[a-zA-Z0-9\sÀ-ỹ\-_.,!?()'"]+$/u,
                "Name can only contain letters, numbers, Vietnamese characters, spaces, and basic punctuation"
            ),

        description: string()
            .trim()
            .min(8, "Description must be at least 8 characters long")
            .max(1000, "Description must be less than 1000 characters"),

        // Cho phép cả string và array of strings
        images: union([
            string()
                .trim()
                .url("Invalid image URL format"),
            array(
                string()
                    .trim()
                    .url("Invalid image URL format")
            )
        ])
    })
});

export const updateVarietySchema = object({
    params: object({
        id: string()
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
            .optional(),

        description: string()
            .trim()
            .min(8, "Description must be at least 8 characters long")
            .max(1000, "Description must be less than 1000 characters")
            .optional(),

        // Cho phép cả string và array of strings trong update
        images: union([
            string()
                .trim()
                .url("Invalid image URL format"),
            array(
                string()
                    .trim()
                    .url("Invalid image URL format")
            )
        ]).optional()
    })
});

export type CreateVarietyInput = TypeOf<typeof createVarietySchema>;
export type UpdateVarietyInput = TypeOf<typeof updateVarietySchema>;