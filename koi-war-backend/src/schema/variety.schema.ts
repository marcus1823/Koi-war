import {array, object, string, TypeOf} from "zod";
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
        }),
        images: array(string({
            required_error: "Image is required",
        })),
        description: string({
            required_error: "Description is required",
        }).min(3,"Description must be at least 3 characters"),
    })
})



export type CreateVarietyInput = TypeOf<typeof createVarietySchema>;