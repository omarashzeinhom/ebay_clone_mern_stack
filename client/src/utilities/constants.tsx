import { ProfilerOnRenderCallback } from "react";
// CHG DEVELOPMENT AND PRODUCTION
export const API_BASE_URL = "https://server-ebay-clone.onrender.com/";

const HOME_URL = "https://ebay-clone-mern-stack.vercel.app/";
const DEVELOP_URL = "http://localhost:3000/";
//const PROD_URL = "https://ebay-clone-mern-stack.vercel.app/";

//const SERVER_DEVELOP_URL = "http://localhost:3001/";

/* NavBar Items Start */
const navItems = [
  {
    title: "Daily Deals",
    link: "/#dailydeals",
  },

  {
    title: "Help & Contact",
    link: "/help&contact",
  },
];

const myEbayItems = [
  {
    title: "Summary",
    link: "#",
  },
  {
    title: "Recently Viewed",
    link: "#",
  },
  {
    title: "Bids/Offers",
    link: "#",
  },
  {
    title: " Watchlist",
    link: "#",
  },
  {
    title: "Purchase History",
    link: "#",
  },
  {
    title: "Buy Again",
    link: "#",
  },
  {
    title: "Selling",
    link: "#",
  },

  {
    title: "Saved Searches",
    link: "#",
  },
  {
    title: "My Garage",
    link: "#",
  },

  {
    title: "Messages",
    link: "#",
  },

  {
    title: "Collection beta",
    link: "#",
  },

  {
    title: "The eBay vault",
    link: "#",
  },
];
/* NavBar Items End*/

/* Footer Links */
const footerLinks = [
  {
    title: "Home",
    href: "/",
  },
  { title: "Help & Contact", href: "/help&contact" },
  {
    title: "Daily Deals",
    href: "/dailydeals",
  },
];
/* Footer Links End */

// Country List
/*Credits to https://gist.github.com/incredimike/1469814 for the countryList */
const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas (the)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory (the)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands (the)",
  "Central African Republic (the)",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands (the)",
  "Colombia",
  "Comoros (the)",
  "Congo (the Democratic Republic of the)",
  "Congo (the)",
  "Cook Islands (the)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic (the)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (the) [Malvinas]",
  "Faroe Islands (the)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories (the)",
  "Gabon",
  "Gambia (the)",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic (the)",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands (the)",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands (the)",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger (the)",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands (the)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines (the)",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation (the)",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan (the)",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands (the)",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (the)",
  "United Kingdom of Great Britain and Northern Ireland (the)",
  "United States Minor Outlying Islands (the)",
  "United States of America (the)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands",
];

/*CustomerService and Survery Common Issues */

export const commonIssues = [
  {
    name: "Buying as a guest",
  },
  {
    name: "Get help with an item that hasn't arrived",
  },
  {
    name: "Get help with an item that hasn't arrived",
  },
  {
    name: "Get help with a hacked account",
  },
  {
    name: "Get help if you bought as a guest",
  },
  {
    name: "Creating an eBay account",
  },
];

/*
Login Constants
*/

export const summaryBoxText = `With this box checked, we'll keep you signed in, making it easier
to bid and buy. You'll also be all set to pay if you've saved your
payment info. You can always turn off this feature in My eBay. We
may ask you to sign in again for some activities, such as making
changes to your account.`;

// Create the onRender function
// Define the onRender function with the correct signature
export const onRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) => {
  // Convert duration values to seconds
  const actualDurationInSeconds = actualDuration / 1000;
  const baseDurationInSeconds = baseDuration / 1000;
  const startTimeInSeconds = startTime / 1000;
  const commitTimeInSeconds = commitTime / 1000;

  // Log the performance information
  console.log(
    "-------- Performance Gotten From Profiler Hook ----------------"
  );
  console.log(`Render ID: ${id}`);
  console.log(`Phase: ${phase}`);
  console.log(`Actual Duration: ${actualDurationInSeconds} s`);
  console.log(`Base Duration: ${baseDurationInSeconds} s`);
  console.log(`Start Time: ${startTimeInSeconds} s`);
  console.log(`Commit Time: ${commitTimeInSeconds} s`);
  console.log(`Interactions: ${JSON.stringify(interactions)}`);
  console.log(
    "---------- Performance Gotten From Profiler Hook --------------"
  );
};

export {
  navItems,
  myEbayItems,
  footerLinks,
  countryList,
  HOME_URL,
  DEVELOP_URL,
};

