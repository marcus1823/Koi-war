import { boolean, object, string, TypeOf } from "zod";
import { parseDateFromString } from "../utils/format.utils";
// /**
//  * @openapi
//  * components:
//  *  schemas:
//  *    CreateContestInstanceInput:
//  *      type: object
//  *      required:
//  *        - contest
//  *        - name
//  *        - startDate
//  *        - endDate
//  *        - isActive
//  *        - description
//  *        - rules
//  *        - images
//  *      properties:
//  *        contest:
//  *          type: string
//  *          default: Contest ID
//  *        startDate:
//  *          type: string
//  *          format: date-time
//  *          default: 2024-10-13T12:00:00Z
//  *        endDate:
//  *          type: string
//  *          format: date-time
//  *          default: 2024-10-15T12:00:00Z
//  *        isActive:
//  *          type: boolean
//  *          default: true
//  *        description:
//  *          type: string
//  *          default: Contest instance description
//  *        rules:
//  *          type: string
//  *          default: Contest rules
//  *        images:
//  *          type: string
//  *          default: contest-image-url
//  *    ContestInstanceResponse:
//  *      type: object
//  *      properties:
//  *        id:
//  *          type: string
//  *        contest:
//  *          type: string
//  *        name:
//  *          type: string
//  *        startDate:
//  *          type: string
//  *          format: date-time
//  *        endDate:
//  *          type: string
//  *          format: date-time
//  *        isActive:
//  *          type: boolean
//  *        description:
//  *          type: string
//  *        rules:
//  *          type: string
//  *        images:
//  *          type: string
//  *        createdAt:
//  *          type: string
//  *        updatedAt:
//  *          type: string
//  */

export const createContestInstanceSchema = object({
  body: object({
    contest: string({
      required_error: "Contest is required",
    }),
    startDate: string({
      required_error: "StartDate is required",
    })
      .refine((value) => parseDateFromString(value) !== null, {
        message: "Invalid date format. Use dd-MM-yyyy",
      })
      .transform((value) => parseDateFromString(value) as Date),
    endDate: string({
      required_error: "EndDate is required",
    })
      .refine((value) => parseDateFromString(value) !== null, {
        message: "Invalid date format. Use dd-MM-yyyy",
      })
      .transform((value) => parseDateFromString(value) as Date),
    isActive: boolean({
      required_error: "Active is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(8, "Description must be at least 8 characters"),
    rules: string({
      required_error: "Rules is required",
    }),
    images: string({
      required_error: "Image is required",
    }),
  }),
});

export type ContestInstanceInput = TypeOf<typeof createContestInstanceSchema>;
