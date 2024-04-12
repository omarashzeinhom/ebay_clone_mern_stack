export interface User {
    userId: string,
    firstName:string,
    lastName: string,
    email : string,
    avatar: string , // ADD Generic Types for image
    password: string,
    
}

export type RegisterFormData = {
    userId: string,
    firstName:string,
    lastName: string,
    email : string,
    avatar: File | string , // ADD Generic Types for image
    password: string,
}