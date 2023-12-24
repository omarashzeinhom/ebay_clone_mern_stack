import { Business } from "../../models/business";

interface BusinessProfileProps {
    business: Business;
    handleRegister: () => void;
    setUser: React.Dispatch<
      React.SetStateAction<Business>
>};


const BusinessProfile: React.FC<BusinessProfileProps> = ({

})=> {
    return (
        <></>
    )
}

export default BusinessProfile;