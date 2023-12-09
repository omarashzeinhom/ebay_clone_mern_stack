import React from "react";
import "./App.css";
import {
  Header,
  Nav,
  SearchBar,
  CategoriesCarousel,
  Categories,
  TrendingProducts,
  Deals,
  Ads,
  Footer,
} from "./components";

function App() {
  return (
    <div>
      <Header />
      <Nav />
      <SearchBar />
      <CategoriesCarousel />
      <Categories />
      <TrendingProducts />
      <Deals />
      <Ads />
      <Footer />
    </div>
  );
}

export default App;
