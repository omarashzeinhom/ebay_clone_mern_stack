export interface Product {
  _id: string;
  id: number;
  name: string;
  description:string;
  quantity: number;
  img: string;
  price: number;
  biddingStartPrice: number;
  biddingFinalPrice: number;
  category: string;
  parent: string;
  businessId: string;
  // Array of Objects for Bid
  bids:[
    {
      userVerified: true, // Todo add check for user if verified or not
      userBiddedId: string,
      userBid: number,
    }
  ]
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
