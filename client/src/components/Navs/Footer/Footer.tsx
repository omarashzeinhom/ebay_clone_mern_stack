import React, { useState, useEffect } from "react";
import "./Footer.scss";

interface FooterLink {
  title?: string;
  href?: string;
}

interface FooterProps {
  footerLinks: FooterLink[];
}

const Footer: React.FC<FooterProps> = ({ footerLinks }) => {
  const [showToTop, setShowToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (window.scrollY > 700) {
          setShowToTop(true);
        } else {
          setShowToTop(false);
        }
      }, 100); // Adjust the debounce delay here
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <footer className="footer">
      <ul className="footer__links">
        {footerLinks.map((footerlink, index) => (
          <li key={index} className="footer__link">
            <a href={footerlink?.href}>{footerlink?.title}</a>
          </li>
        ))}
      </ul>
      <small>Omar Ashraf Zeinhom © 2023 - 2024</small>
      {showToTop && (
        <button
          type="button"
          aria-label="ReturnToTopOfPageButton"
          className="scroll-totop__btn"
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;
