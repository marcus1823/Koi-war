import {object, string, TypeOf} from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateContestInput:
 *      type: object
 *      required:
 *        - name
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          minLength: 2
 *          maxLength: 150
 *          pattern: ^[a-zA-Z0-9\s\-_]+$
 *          example: "Summer Fishing Contest 2024"
 *        description:
 *          type: string
 *          minLength: 8
 *          maxLength: 1000
 *          example: "Annual summer fishing competition"
 *    UpdateContestInput:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          minLength: 2
 *          maxLength: 150
 *          pattern: ^[a-zA-Z0-9\s\-_]+$
 *          example: "Updated Contest Name"
 *        description:
 *          type: string
 *          minLength: 8
 *          maxLength: 1000
 *          example: "Updated contest description"
 *    ContestResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          example: "64f5b3d12c064589a3c8c459"
 *        name:
 *          type: string
 *          example: "Summer Fishing Contest 2024"
 *        description:
 *          type: string
 *          example: "Annual summer fishing competition"
 *        contestInstances:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ContestInstanceResponse'
 */
export const createContestSchema = object({
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
            ),
        description: string({
            required_error: "Description is required",
        })
            .trim()
            .min(8, "Description must be at least 8 characters long")
            .max(1000, "Description must be less than 1000 characters long"),
    })
})

export const updateContestSchema = object({
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
            .max(1000, "Description must be less than 1000 characters long")
            .optional(),
    }),
});

export type CreateContestInput = TypeOf<typeof createContestSchema>;
export type UpdateContestInput = TypeOf<typeof updateContestSchema>;
