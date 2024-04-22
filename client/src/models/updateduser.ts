export interface UpdatedUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatar?:  any; // or whatever type is appropriate
}

export type UpdatedUserFormData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: any; // ADD Generic Types for image
};
