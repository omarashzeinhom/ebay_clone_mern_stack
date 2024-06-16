import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Header() {
  const [pageTitle] = useState("eBay Clone");
  
  useEffect(() => {
    // Update the document title when pageTitle changes
    document.title = `${pageTitle} | eBay Clone`;
  }, [pageTitle]);



  return (
    <HelmetProvider>
<Helmet>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content="eBay Clone App By ANDGOEDU"
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

     
    </Helmet>

    </HelmetProvider>
    
  );
}