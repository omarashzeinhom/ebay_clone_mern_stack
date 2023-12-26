export interface User {
    userId: string,
    firstName:string,
    lastName: string,
    email : string,
    avatar?: string | File, 
    password: string,
}