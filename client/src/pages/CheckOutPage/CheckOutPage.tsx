import React from "react";
import { Footer, Header, Nav, SearchBar, ShoppingCart } from "../../components";
import { footerLinks } from "../../utilities/constants";

interface CheckOutProps {
    total: number;
    pageTitle: string;
}


const CheckOutPage: React.FC<CheckOutProps> = ({ total, pageTitle }) => {
    return (
        <>
            <Header pageTitle={pageTitle} />
            <Nav total={0} pageTitle="CheckOut" />
            <SearchBar/>
            <h1>CheckOut</h1>
            <ShoppingCart total={0} />
            <Footer footerLinks={footerLinks} />
        </>
    );
}

export default CheckOutPage;
