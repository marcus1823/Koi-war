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
 *          default: Contest Name
 *        description:
 *          type: string
 *          default: This is a contest description
 *    ContestResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export const createContestSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        })
            .min(2, "Name must be at least 2 characters long")
            .max(150, "Name must be less than 150 characters long"),
        description: string({
            required_error: "Description is required",
        }).min(8, "Description must be at least 8 characters long"),
    })
})

export const updateContestSchema = object({
    body: object({
        name: string()
            .min(2, "Name must be at least 2 characters long")
            .max(150, "Name must be less than 150 characters long")
            .optional(),
        description: string()
            .min(8, "Description must be at least 8 characters long")
            .optional(),
    }),
});

export type CreateContestInput = TypeOf<typeof createContestSchema>;
export type UpdateContestInput = TypeOf<typeof updateContestSchema>;
