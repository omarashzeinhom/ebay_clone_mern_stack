import React, { useEffect } from "react";

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  useEffect(() => {
    document.title = `${pageTitle} | eBay Clone`;
  }, [pageTitle]);

  return null;
}

export default Header;