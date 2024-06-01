import { useEffect } from "react";
import { Nav, SearchBar, SellComponent } from "../../components"
 document.title = 'Sell'

interface SellPageProps {
  total: number,
  pageTitle: string,
}


export default function SellPage({ total }: SellPageProps) {
  useEffect(() => {
    document.title = 'Sell';
    return () => {
      // Optionally, you can reset the title when the component unmounts
      document.title = 'Sell';
    };
  }, []);

  return (
    <>
      <Nav pageTitle="Sell"
        total={total} />
      <SearchBar />
      <SellComponent />
    </>

  )
}