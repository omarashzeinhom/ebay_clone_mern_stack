
interface CheckOutProps{
    total: number;

}

export default function CheckOut(props: CheckOutProps): JSX.Element{
    return (
        <>CheckOut
        {props}
        </>
    )
}