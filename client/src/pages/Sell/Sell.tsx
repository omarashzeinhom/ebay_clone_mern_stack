import { Sell } from "../../components"


interface SellPageProps {
    total: number,
  }

export default function SellPage({total } : SellPageProps){
    return (
        <Sell total={total} />
    )
}