export interface Bid {
  // Define your bidding state properties here
  id: string;
  price: number;

  
}

export interface BiddingHistory {
    //products: Product[];
    currentBid: Bid | null;
    biddingHistory: Bid[];
}