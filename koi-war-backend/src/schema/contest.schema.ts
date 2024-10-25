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
        }),
        description: string({
            required_error: "Description is required",
        }).min(8,"Description must be at least 8 characters"),
    })

})

export type CreateContestInput = TypeOf<typeof createContestSchema>;