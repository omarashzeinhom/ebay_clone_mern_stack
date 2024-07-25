import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../models';
import { Bid } from '../models/bid';

interface BiddingState {
  // Define your bidding state properties here
  products: Product[];
  currentBid: Bid | null;
  biddingHistory: Bid[];
}

const BiddingContext = createContext<BiddingState | undefined>(undefined);

export const useBiddingContext = () => {
  const context = useContext(BiddingContext);
  if (!context) {
    throw new Error('useBiddingContext must be used within a BiddingProvider');
  }
  return context;
};

interface BiddingProviderProps {
  children: ReactNode;
}

export const BiddingProvider: React.FC<BiddingProviderProps> = ({ children }) => {
  const [biddingState, ] = useState<BiddingState>({
    products: [],
    currentBid: null,
    biddingHistory: [],
  });
  

 

  return (
    <BiddingContext.Provider value={biddingState}>
      {children}
    </BiddingContext.Provider>
  );
};