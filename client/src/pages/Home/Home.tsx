import {
    Header,
    Nav,
    SearchBar,
    AdsCarousel,
    CategoriesCarousel,
    Categories,
    TrendingProducts,
    Deals,
    Ads,
    Footer,
  } from "../../components";

export default function Home(){

    return (
     <>
        <Header />
        <Nav />
        <SearchBar />
        <AdsCarousel/>
        <CategoriesCarousel />
        <Categories />
        <TrendingProducts />
        <Deals />
        <Ads />
        <Footer />
     </>
    )
}