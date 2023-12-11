// NotFound.tsx
import React from "react";
import "./NotFound.scss"; // Import the corresponding SCSS file

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <h2 className="not-found-title">404 Not Found</h2>
      <hr />
      <img
        className="not-found-image"
        src="/notfound.jpeg" // Replace with the actual meme image URL
        alt="Funny Meme"
        loading="lazy"
      />
      <p className="not-found-text">
        Sorry, the page you are looking for does not exist.
      </p>
      <hr />

      <a href="/">Return back </a>
    </div>
  );
};

export default NotFound;
