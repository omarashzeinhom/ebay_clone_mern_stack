import React from 'react';
import { useBiddingContext } from '../../context/biddingContext';

const BidHistory: React.FC = () => {
  const { biddingHistory } = useBiddingContext();

  return (
    <div>
      <h2>Bid History</h2>
      <ul>
        {biddingHistory.map((bid) => (
          <li key={bid?.id}>{/* Render each bid */}</li>
        ))}
      </ul>
    </div>
  );
};

export default BidHistory;
