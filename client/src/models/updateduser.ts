export interface UpdatedUser {
  userId: string;
  updatedEmail?: string;
  updatedPassword?: string;
  updatedFirstName?: string;
  updatedLastName?: string;
  updatedAvatar?: File | string; // or whatever type is appropriate
}

export type UpdatedUserFormData = {
  userId: string;
  updatedFirstName: string;
  updatedLastName: string;
  updatedEmail: string;
  updatedAvatar?: File | string; // ADD Generic Types for image
  updatedPassword: string;
};
