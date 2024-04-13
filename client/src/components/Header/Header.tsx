import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
//import { useCategoryContext } from "../../context/CategoryContext";
//import { useProductContext } from "../../context/ProductContext";

export default function Header() {
  const [pageTitle] = useState("eBay Clone");
  //const { categoryData } = useCategoryContext();
  //const { products } = useProductContext();

  useEffect(() => {
    // Update the document title when pageTitle changes
    document.title = `${pageTitle} | eBay Clone`;
  }, [pageTitle]);

  const stripeCSP = `https://js.stripe.com https://m.stripe.network https://m.stripe.com https://m.stripe.network https://fonts.gstatic.com https://m.stripe.network https://js.stripe.com https://m.stripe.network https://m.stripe.com https://b.stripecdn.com https://m.stripe.network 'sha256-/5Guo2nzv5n/w6ukZpOBZOtTJBJPSkJ6mhHpnBgm3Ls=' https://m.stripe.network https://q.stripe.com/csp-report`;
  return (
    <>
      <title>{pageTitle}</title>
    </>
  );
}
