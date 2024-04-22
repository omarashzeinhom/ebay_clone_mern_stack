import { countryList } from "./countryList";

//import { ProfilerOnRenderCallback } from "react";
// CHG DEVELOPMENT AND PRODUCTION
 const API_BASE_URL = "https://server-ebay-clone.onrender.com/";

const HOME_URL = "https://ebay-clone-mern-stack.vercel.app/";
//const DEVELOP_URL = "http://localhost:3000/";
//const PROD_URL = "https://ebay-clone-mern-stack.vercel.app/";
// const BACKEND_URL_PROD = "https://server-ebay-clone.onrender.com";

//const SERVER_DEVELOP_URL = "http://localhost:3001/";

// Config Constants
// CHG DEVELOPMENT AND PRODUCTION

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


export {
  navItems,
  myEbayItems,
  footerLinks,
  countryList,
  summaryBoxText,
  commonIssues,
  //URIS
  API_BASE_URL,
  HOME_URL,
  bussinessProductsFullUploadUri,
  businessUpdatesFullUploadUri,
  userUpdatesFullUploadUri,
  signInLink,
  //,

};
