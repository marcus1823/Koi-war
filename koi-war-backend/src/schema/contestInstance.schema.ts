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
      required_error: "Contest ID is required",
    })
      .trim()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid contest ID format"),
    
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
      .transform(val => val.replace(/\s+/g, ' ')), // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng
    
    startDate: string({
      required_error: "Start date is required",
    })
      .refine((value) => {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
        return dateRegex.test(value);
      }, {
        message: "Invalid date format. Use dd-MM-yyyy",
      })
      .refine((value) => {
        const date = parseDateFromString(value);
        if (!date) return false;
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return date >= now;
      }, "Start date must be in the future"),

    endDate: string({
      required_error: "End date is required",
    })
      .refine((value) => {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
        return dateRegex.test(value);
      }, {
        message: "Invalid date format. Use dd-MM-yyyy",
      }),

    isActive: boolean({
      required_error: "Active status is required",
    }),

    description: string({
      required_error: "Description is required",
    })
      .trim()
      .min(8, "Description must be at least 8 characters")
      .max(1000, "Description must be less than 1000 characters"),

    rules: string({
      required_error: "Rules are required",
    })
      .trim()
      .min(10, "Rules must be at least 10 characters")
      .max(2000, "Rules must be less than 2000 characters"),

    images: string({
      required_error: "Image URL is required",
    })
      .trim()
      .url("Invalid image URL format"),
  }).refine((data) => {
    const startDate = parseDateFromString(data.startDate);
    const endDate = parseDateFromString(data.endDate);
    
    if (!startDate || !endDate) {
      return false;
    }

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    // Kiểm tra ngày hợp lệ
    const isValidDate = (date: Date) => {
      return date.toString() !== 'Invalid Date';
    };

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      return false;
    }

    return endDate >= startDate;
  }, {
    message: "End date must be equal to or after start date",
    path: ["endDate"],
  }),
});

export const updateContestInstanceSchema = object({
  body: object({
    name: string()
      .trim() 
      .min(2, "Name must be at least 2 characters long")
      .max(150, "Name must be less than 150 characters long")
      .regex(
        /^[a-zA-Z0-9\sÀ-ỹ\-_.,!?()'"]+$/u,
        "Name can only contain letters, numbers, Vietnamese characters, spaces, and basic punctuation"
      )
      .transform(val => val.replace(/\s+/g, ' ')) // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng
      .optional(),
    
    startDate: string()
      .refine((value) => {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
        return dateRegex.test(value);
      }, {
        message: "Invalid date format. Use dd-MM-yyyy",
      })
      .refine((value) => {
        const date = parseDateFromString(value);
        if (!date) return false;
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return date >= now;
      }, "Start date must be in the future")
      .optional(),

    endDate: string()
      .refine((value) => {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
        return dateRegex.test(value);
      }, {
        message: "Invalid date format. Use dd-MM-yyyy",
      })
      .optional(),

    isActive: boolean().optional(),

    description: string()
      .trim()
      .min(8, "Description must be at least 8 characters")
      .max(1000, "Description must be less than 1000 characters")
      .optional(),

    rules: string()
      .trim()
      .min(10, "Rules must be at least 10 characters")
      .max(2000, "Rules must be less than 2000 characters")
      .optional(),

    images: string()
      .trim()
      .url("Invalid image URL format")
      .optional(),
  }).refine((data) => {
    if (data.startDate && data.endDate) {
      const startDate = parseDateFromString(data.startDate);
      const endDate = parseDateFromString(data.endDate);
      
      if (!startDate || !endDate) {
        return false;
      }

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      // Kiểm tra ngày hợp lệ
      const isValidDate = (date: Date) => {
        return date.toString() !== 'Invalid Date';
      };

      if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return false;
      }

      return endDate >= startDate;
    }
    return true;
  }, {
    message: "End date must be equal to or after start date",
    path: ["endDate"],
  }),
});

export type CreateContestInstanceInput = TypeOf<typeof createContestInstanceSchema>;

export type UpdateContestInstanceInput = TypeOf<typeof updateContestInstanceSchema>;
