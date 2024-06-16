import { BusinessContactInfoForm, Footer, Header, Nav, SearchBar, UserContactInfoForm } from "../../components";
import { useBusinessAuth, useUserAuth } from "../../context";
import { Bid } from "../../models/bid";
import { footerLinks } from "../../utilities/constants";
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
            <Header pageTitle="MyBids" />
            <Nav total={0} pageTitle="CheckOut" />
            <SearchBar />
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
            <Footer footerLinks={footerLinks} />
        </>
    )
}