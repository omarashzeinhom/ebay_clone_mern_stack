import { countryList } from "../../../utilities/constants"

export default function BusinessContactInfoForm() {
    return (
        <>
            <h2>BusinessContact Form</h2>
            <form className="app__signin app__signin-container"
            >
                <select name="country" title="country-selection">
                    {countryList.map((country, index) => {
                        return (
                            <option>{country}</option>
                        )
                    })}
                </select>
                <input name="business-address" type="text" title="address" placeholder="Address" className="app__signin-input"
                />
                <input name="business-additional-info" type="text" title="additionalInfo" placeholder="Additional Info" className="app__signin-input"
                />
                <input name="business-city" type="text" title="city" className="app__signin-input"
                />
                <input name="business-state-province-region" type="text" title="State-Province-Region" placeholder="State/Province/Region" className="app__signin-input"
                />
                <input name="business-postal-code" type="number" title="PostalCode" placeholder="Postal Code" className="app__signin-input"
                />
                <input name="business-mobile-number" type="number" title="mobileNumber" placeholder="Mobile number" className="app__signin-input"
                />
                <a href="#landline" >
                    i only have a landline
                </a>
                <button
                    aria-label="MessageUsSurveyButton"
                    className="app__signin-Btn"
                    type="submit"
                >
                    Continue
                </button>
            </form>
        </>
    )
}