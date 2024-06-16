import React, { useEffect } from "react";

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  useEffect(() => {
    document.title = `${pageTitle} | eBay Clone`;
  }, [pageTitle]);

  return null; // Since <title> tag cannot be directly rendered in React
}

export default Header;