// Config Constants
import { countryList} from "./countryList";
// CHG DEVELOPMENT AND PRODUCTION
const HOME_URL = "http://localhost:3000/";
const API_BASE_URL = "http://localhost:5000/";


//const DEVELOP_URL = "http://localhost:3000/";
//const PROD_URL = "https://ebay-clone-mern-stack.vercel.app/";
//const SERVER_DEVELOP_URL = "http://localhost:5000/";
//const SERVER_PROD_URL = "https://server-ebay-clone.onrender.com";

const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || " ";

//  businessUploads URIs
const businessUpdatesfolderPath = "ebay-clone-mern-images/business/avatars";
const businessUpdatesUploadEndPoint = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
const businessUpdatesFullUploadUri = `${businessUpdatesUploadEndPoint}?folder=${businessUpdatesfolderPath}`;

const businessProductsfolderPath = "ebay-clone-mern-images/businesses/products";
const businessProductsUploadEndPoint = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
const bussinessProductsFullUploadUri = `${businessProductsUploadEndPoint}?folder=${businessProductsfolderPath}`;

//  userUploads URIs
const signInLink = `${HOME_URL}signin`;

const userUpdatesfolderPath = "ebay-clone-mern-images/users/avatar";
const userUpdatesUploadEndPoint = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
const userUpdatesFullUploadUri = `${userUpdatesUploadEndPoint}?folder=${userUpdatesfolderPath}`;

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
    link: "/",
  },
  {
    title: "Recently Viewed",
    link: "/",
  },
  {
    title: "Bids/Offers",
    link: "/",
  },
  {
    title: " Watchlist",
    link: "/",
  },
  {
    title: "Purchase History",
    link: "/",
  },
  {
    title: "Buy Again",
    link: "/",
  },
  {
    title: "Selling",
    link: "/",
  },

  {
    title: "Saved Searches",
    link: "/",
  },
  {
    title: "My Garage",
    link: "/",
  },

  {
    title: "Messages",
    link: "/",
  },

  {
    title: "Collection beta",
    link: "/",
  },

  {
    title: "The eBay vault",
    link: "/",
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

/*CustomerService and Survery Common Issues */

const commonIssues = [
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

const summaryBoxText = `With this box checked, we'll keep you signed in, making it easier
to bid and buy. You'll also be all set to pay if you've saved your
payment info. You can always turn off this feature in My eBay. We
may ask you to sign in again for some activities, such as making
changes to your account.`;


/** Selling Constants */

/** Ads Constants */

 const AdItems = [
  {
    id: 1,
    category: "ebay",
    title: "eBay Deals made easy all year long",
    description: "Free shipping. Best prices. Get your thing →→",
    imageUrl: "https://source.unsplash.com/400x400/?ebay",
    link: "/category/Video Games & Consoles",
  },
  {
    id: 2,
    category: "holiday-gifts",
    title: "Up to 60% off holiday gifts",
    description: "Shop candles, cookware, décor, and more. Take a look →",
    imageUrl: "https://source.unsplash.com/400x400/?holiday,gifts",
    link: "/category/Video Games & Consoles",
  },
  {
    id: 3,
    category: "adidas",
    title: "Unwrap holiday savings on adidas",
    description:
      "Save an additional 50% on gift-worthy faves with code ADI5OSALE. Shop now →",
    imageUrl: "https://source.unsplash.com/400x400/?adidas",
    link: "/category/Collectible Sneakers",
  },
  {
    id: 4,
    category: "tire-installation",
    title: "Get local tire installation",
    description:
      "Have your new set installed by our network of experts. Shop top brands →",
    imageUrl: "https://source.unsplash.com/400x400/?tire,installation",
    link: "/category/Parts & accessories",
  },
];


export {
  navItems,
  myEbayItems,
  footerLinks,
  countryList,
  summaryBoxText,
  commonIssues,
  AdItems,
  //URIS
  API_BASE_URL,
  HOME_URL,
  bussinessProductsFullUploadUri,
  businessUpdatesFullUploadUri,
  userUpdatesFullUploadUri,
  signInLink,
  //,

};
