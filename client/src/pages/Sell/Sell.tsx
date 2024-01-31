import { useEffect } from "react";
import { Sell } from "../../components"


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
        <Sell total={total} />
    )
}