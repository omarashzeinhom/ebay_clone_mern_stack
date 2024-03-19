export interface User {
    userId: string,
    firstName:string,
    lastName: string,
    email : string,
    avatar?: any, // ADD Generic Types for image
    password: string,
    
}