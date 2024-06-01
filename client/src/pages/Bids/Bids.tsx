import { BusinessContactInfoForm, UserContactInfoForm } from "../../components";
import { useBusinessAuth, useUserAuth } from "../../context";
import { Bid } from "../../models/bid";
document.title = 'Bid'
interface BidsProps {
    pageTitle: string;
    bid?: Bid[];
}

export default function Bids({ pageTitle }: BidsProps) {
    const { user } = useUserAuth();
    const { business } = useBusinessAuth();


    return (
        <>
            <h2>Bids</h2>

            {business && (
                <>
                    <BusinessContactInfoForm />
                </>
            )}
            {user && (
                <>
                    <UserContactInfoForm />
                </>
            )}

        </>
    )
}