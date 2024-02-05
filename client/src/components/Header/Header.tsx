import { useEffect } from "react";
import "./Header.scss";
import { Helmet } from "react-helmet";



export default function Header() {

const defaultTitle = "eBay Clone";
useEffect(() => {
    // Optionally, you can perform additional logic when the title changes
    console.log('Document title changed:', document?.title);
  }, []);
  
  
  return (
    <Helmet>
      <title>{`${defaultTitle} | ${document?.title || ""}`}</title>      <meta
        name="description"
        content="Your eBay Clone App Description Goes Here"
      />
      <meta name="keywords" content="eBay, Clone, React, TypeScript, MongoDB, Express" />
      <meta name="author" content="Your Name" />
      <link rel="canonical" href="https://ebay-clone-mern-stack.vercel.app/" />
    </Helmet>
  );
}
