// NotFound.tsx
import React, { useEffect } from "react";
import "./NotFound.scss"; 
import SearchBar from "../../components/SearchBar/SearchBar";



const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'NotFound'; // Set your desired dynamic page title here
    return () => {
      // Optionally, you can reset the title when the component unmounts
      document.title = 'NotFound';
    };
  }, []);
  return (
  <>
    <SearchBar/>
    <div className="not-found-container">
      <h2 className="not-found-title">404 Not Found</h2>
       
        <img
              rel="preload"
        className="not-found-image"
        src="/notfound.jpeg"
        alt="Funny Meme"
        loading="lazy"
      />
      <p className="not-found-text">
        Sorry, the page you are looking for does not exist.
      </p>
       

      <a href="/">Return back </a>
    </div>
  </>
  );
};

export default NotFound;
