import React from "react";

interface LoadingProps {
  text?: string; // Optional text to display alongside the loading indicator
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <p>Loading...</p>
      {text && <p>{text}</p>}
      {/* You can customize the loading indicator (e.g., using a spinner library) */}
    </div>
  );
};

export default Loading;
