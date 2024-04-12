import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useCategoryContext } from "../../context/CategoryContext";
import { useProductContext } from "../../context/ProductContext";

export default function Header() {
  const [pageTitle, setPageTitle] = useState("eBay Clone");
  const { categoryData } = useCategoryContext();
  const { products } = useProductContext();

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
      <link rel="canonical" href="https://ebay-clone-mern-stack.vercel.app/" />
      {categoryData.map((category, index) => {
        const categoryImage = category.img;
        return (
          <link key={index} rel="preload" href={categoryImage} type="text" as="fetch"  />
        );
      })}

      {products.map((product, index) => {
        const productImage = product.img;
        return (
          <link key={index} rel="preload" href={productImage}  type="text" as="fetch" />
        );
      })}
      <meta
        httpEquiv="Content-Security-Policy"
        content="script-src 'unsafe-inline' 'self' 'https://m.stripe.network' 'https://m.stripe.com';"
      />
    </Helmet>
  );
}
