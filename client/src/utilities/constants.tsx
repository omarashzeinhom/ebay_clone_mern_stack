// Config Constants
import { countryList} from "./countryList";
// CHG DEVELOPMENT AND PRODUCTION
const HOME_URL = "https://ebay-clone-mern-stack.vercel.app/";
const API_BASE_URL = "https://server-ebay-clone.onrender.com/";


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
    category: "Cars & trucks",
    title: "Cars & trucks Deals made easy all year long",
    description: "Best prices. Get your thing →→",
    img: "https://images.unsplash.com/photo-1547744152-14d985cb937f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/category/Cars & trucks",
  },
  {
    id: 2,
    category: "Parts & accessories",
    title: "Up to 60% off holiday gifts",
    description: "Shop candles, cookware, décor, and more. Take a look →",
    img: "https://images.unsplash.com/photo-1525841508523-2aebc593a6b7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QWlyJTIwRmlsdGVyfGVufDB8fDB8fHww",
    link: "/category/Parts & accessories",
  },
  {
    id: 3,
    category: "adidas",
    title: "Unwrap holiday savings on adidas",
    description:
      "Save an additional 50% on gift-worthy faves with code ADI5OSALE. Shop now →",
    img: "https://images.unsplash.com/photo-1585459733416-825300c90f90?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/category/Collectible Sneakers",
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
