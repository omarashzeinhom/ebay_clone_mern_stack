import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function Header() {
  const [pageTitle, setPageTitle] = useState("eBay Clone");

  useEffect(() => {
    // Update the document title when pageTitle changes
    document.title = `${pageTitle} | eBay Clone`;
  }, [pageTitle]);

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content="Your eBay Clone App Description Goes Here"
      />
      <meta
        name="keywords"
        content="eBay, Clone, React, TypeScript, MongoDB, Express"
      />
      <meta name="author" content="Omar Ashraf Zeinhom | &GoEdu" />
      <link
        rel="canonical"
        href="https://ebay-clone-mern-stack.vercel.app/"
      />
      <link
        rel="preload"
        href="https://source.unsplash.com/"
        as="image"
      />
      <meta
        httpEquiv="Content-Security-Policy"
        content="script-src 'unsafe-inline' 'self';"
      />
    </Helmet>
  );
}
