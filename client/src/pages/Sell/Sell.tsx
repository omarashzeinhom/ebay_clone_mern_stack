import { useEffect } from "react";
import { Nav, SearchBar,SellComponent } from "../../components"


interface SellPageProps {
    total: number,
  }


export default function SellPage({total } : SellPageProps){
    useEffect(() => {
        document.title = 'Sell'; 
        return () => {
          // Optionally, you can reset the title when the component unmounts
          document.title = 'Your Default Title';
        };
      }, []);
    
    return (
     <>
      <Nav total={total} />
      <SearchBar />
      <SellComponent/>
     </>
   
    )
}