export interface Business {
    businessId?: string ,
    businessName: string,
    businessEmail: string,
    businessPassword: string,
    businessAvatar?: string,
    businessActive: boolean,
    businessLocation: string ,
    businessCountry?: string,
    businessProducts?: [],

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


