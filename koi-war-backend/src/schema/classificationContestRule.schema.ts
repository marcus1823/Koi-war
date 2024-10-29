import { array, number, object, string, TypeOf } from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateClassificationContestRuleInput:
 *      type: object
 *      required:
 *        - name
 *        - description
 *        - contestSubCategory
 *        - varieties
 *      properties:
 *        name:
 *          type: string
 *          default: Classification Name
 *        description:
 *          type: string
 *          default: Classification Description
 *        contestSubCategory:
 *          type: string
 *          default: Contest SubCategory ID
 *        varieties:
 *          type: array
 *          items:
 *            type: string
 *          default: ["Variety1", "Variety2"]
 *    ClassificationContestRuleResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        contestSubCategory:
 *          type: string
 *        varieties:
 *          type: array
 *          items:
 *            type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

const createRangeSchema = (
  name: string,
  max_limit: number = 1000
) => object({
  min: number({
    required_error: `Minimum ${name} is required`,
  })
    .min(0, `Minimum ${name} cannot be negative`)
    .max(max_limit, `Maximum ${name} cannot exceed ${max_limit}`),
  max: number({
    required_error: `Maximum ${name} is required`,
  })
    .min(0, `Maximum ${name} cannot be negative`)
    .max(max_limit, `Maximum ${name} cannot exceed ${max_limit}`),
}).refine(data => data.max > data.min, {
  message: `Maximum ${name} must be greater than minimum ${name}`,
  path: ["max"],
});

const optionalRangeSchema = (
  name: string,
  max_limit: number = 1000
) => createRangeSchema(name, max_limit).optional();

export const createClassificationContestRuleSchema = object({
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
      .transform(val => val.replace(/\s+/g, ' ')), // Thay thế nhiều khoảng trắng liên tiếp b��ng một khoảng trắng
    
    description: string({
      required_error: "Description is required",
    })
    .trim()
    .min(8, "Description must be at least 8 characters long")
    .max(1000, "Description must be less than 1000 characters"),

    contestSubCategory: string({
      required_error: "Contest Sub Category is required",
    })
    .trim()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Contest Sub Category ID format"),
    
    varieties: array(
      string({
        required_error: "Varieties is required",
      })
      .trim()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Variety ID format")
    ),
    weightRange: createRangeSchema('weight'),
    sizeRange: createRangeSchema('size'),
    ageRange: createRangeSchema('age', 100),
  }),
});

export const updateClassificationContestRuleSchema = object({
  params: object({
    id: string()
      .trim()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Classification Contest Rule ID format"),
  }),
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
      .transform(val => val.replace(/\s+/g, ' ')), // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng
    
    description: string({
      required_error: "Description is required",
    })
    .trim()
    .min(8, "Description must be at least 8 characters long")
    .max(1000, "Description must be less than 1000 characters"),

    contestSubCategory: string({
      required_error: "Contest Sub Category is required",
    })
    .trim()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Contest Sub Category ID format"),
    
    varieties: array(
      string({
        required_error: "Varieties is required",
      })
      .trim()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid Variety ID format")
    ),
    weightRange: optionalRangeSchema('weight'),
    sizeRange: optionalRangeSchema('size'),
    ageRange: optionalRangeSchema('age', 100),
  }),
});

export type ClassificationContestRuleInput = TypeOf<typeof createClassificationContestRuleSchema>;
export type UpdateClassificationContestRuleInput = TypeOf<typeof updateClassificationContestRuleSchema>;