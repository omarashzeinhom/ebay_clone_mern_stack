export interface UpdatedUser {
  userId: string;
  updatedFirstName?: string;
  updatedLastName?: string;
  updatedEmail?: string;
  updatedPassword?: string;
  updatedAvatar?:  any; // or whatever type is appropriate
}

export type UpdatedUserFormData = {
  userId: string;
  updatedFirstName: string;
  updatedLastName: string;
  updatedEmail: string;
  updatedPassword: string;
  updatedAvatar?: any; // ADD Generic Types for image
};
