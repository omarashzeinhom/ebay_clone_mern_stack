import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function Header() {
  const [pageTitle] = useState("eBay Clone");

  useEffect(() => {
    // Update the document title when pageTitle changes
    document.title = `${pageTitle} | eBay Clone`;
  }, [pageTitle]);



  const stripeCSP = `https://js.stripe.com https://m.stripe.network https://m.stripe.com https://m.stripe.network https://fonts.gstatic.com https://m.stripe.network https://js.stripe.com https://m.stripe.network https://m.stripe.com https://b.stripecdn.com https://m.stripe.network 'sha256-/5Guo2nzv5n/w6ukZpOBZOtTJBJPSkJ6mhHpnBgm3Ls=' https://m.stripe.network https://q.stripe.com/csp-report`
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
     {/*
      {categoryData.map((category, index) => {
        const categoryImage = category.img;
        return (
          <link
           // key={index}
            //rel="preload"
            //href={categoryImage}
            //type="text"
            //as="fetch"
            //crossOrigin="anonymous"
          />
        );
      })}
     
     */}

     {/*
      {products.map((product, index) => {
        const productImage = product.img;
        return (
          <link
            //key={index}
            //rel="preload"
            //href={productImage}
            //type="text"
            //as="fetch"
            //crossOrigin="anonymous"
          />
        );
      })}
     
     */}
      <meta
       httpEquiv="Content-Security-Policy"
        content={`script-src  'self' ${stripeCSP} ;
        object-src 'none';`}
      />
    </Helmet>
  );
}