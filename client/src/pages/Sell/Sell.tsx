import { Nav, SearchBar,SellComponent } from "../../components"


interface SellPageProps {
    total: number,
  }


export default function SellPage({total } : SellPageProps){

    
    return (
     <>
      <Nav total={total} pageTitle="Sell" />
      <SearchBar />
      <SellComponent/>
     </>
   
    )
}