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
