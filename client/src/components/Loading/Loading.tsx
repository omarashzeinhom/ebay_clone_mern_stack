// Loading.tsx

import React from "react";
import "./Loading.scss";

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div className="loading-container">
      <p>Loading...</p>
      {text && <p>{text}</p>}
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
