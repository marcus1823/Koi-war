export interface RegisterUser {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface Login {
  _id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  username: string;
  role: string;
}

// Interface cho contest instance trong contest và contest subcategory
export interface ContestInstance {
  id: string;
  contest: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  description: string;
  rules: string;
  images: string[];
  isDisabled: boolean;
  contestSubCategories: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ContestSubCategory {
  id: string;
  name: string;
  description: string;
  contestInstance: ContestInstance;
}

export interface Contest {
  id: string;
  name: string;
  description: string;
  contestInstances: ContestInstance[];
}

export interface ContestResponse {
  success: boolean;
  data: Contest[];
}

export interface ContestSubCategoryResponse {
  success: boolean;
  data: ContestSubCategory[];
}

export interface Variety {
  _id: string;
  name: string;
  description: string;
  images: string[];
}

export interface VarietyCardProps {
  variety: Variety;
}

export interface CreateVarietyPayload {
  name: string;
  description: string;
  images: string[];
}


export interface SubCategory {
  id: string;
  name: string;
  description: string;
}

export interface SubCategoryCardProps {
  subCategory: SubCategory;
}

export interface ClassificationRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  ranks: { name: string }[];
}

export interface ClassificationRuleCardProps {
  classificationRule: ClassificationRule;
}