export interface Business {
    businessId?: string ,
    businessName: string,
    businessEmail: string,
    businessPassword: string,
    businessLocation: string ,
    businessActive?: boolean,
    businessAvatar?: string, 
    businessProducts?: [],
    businessCountry?: string,
}

export interface RegisterBusinessFormData{
    businessId: string ,
    businessName: string,
    businessEmail: string,
    businessPassword: string,
    businessAvatar:  File | string, 
    businessActive: boolean,
    businessLocation: string ,
    businessCountry: string,
    businessProducts: [],
}


