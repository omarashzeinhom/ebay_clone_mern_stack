import { useEffect, useState } from "react";

export default function Header() {
  const [pageTitle] = useState("eBay Clone");


  useEffect(() => {
    // Update the document title when pageTitle changes
    document.title = `${pageTitle} | eBay Clone`;
  }, [pageTitle]);

  return (
    <>
      <title>{pageTitle}</title>
    </>
  );
}
