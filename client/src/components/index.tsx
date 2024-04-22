// Navs
import {Header,Nav,Footer} from "./Navs"

// Search
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchBar/SearchResults";
// Ads
import { Ads, AdsCarousel } from "./Ads";
// Categories
import { CategoryList, CategoriesCarousel,CategorySideBar } from "./Categories";
// Cart
import { Checkout, CartItem, ShoppingCart } from "./Cart";
// Products
import {
  ProductList,
  ProductDetail,
  TrendingProducts,
  TrendingProductsAlpha,
} from "./Product";
// CRUD Products
import SellComponent from "./Sell/SellComponent";
// Auth
import { SignInForm, RegisterForm,Profile } from "./Auth";
// Survey
import SurveyForm from "./SurveyForm/SurveyForm";

//Misc
import Loading from "./Loading/Loading";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import NotificationCard from "./NotifcationCard/NotificationCard";


export {
  Header,
  Nav,
  SearchBar,
  SearchResults,
  Footer,
  Ads,
  AdsCarousel,
  CategoryList,
  CategoriesCarousel,
  CategorySideBar,
  Loading,
  Checkout,
  CartItem,
  ShoppingCart,
  ProductList,
  ProductDetail,
  TrendingProducts,
  TrendingProductsAlpha,
  Profile,
  SignInForm,
  RegisterForm,
  ErrorBoundary,
  SellComponent,
  NotificationCard,
  SurveyForm,
};
