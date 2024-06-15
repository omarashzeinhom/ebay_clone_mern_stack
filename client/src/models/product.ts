export interface Product {
  _id: string;
  id: number;
  name: string;
  description:string;
  quantity: number;
  img: string;
  price: number;
  category: string;
  parent: string;
  businessId: string;

}


export type CreateProductFormData = {
  id: number;
  businessId: string;
  img: File | string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  parent: string;
};
