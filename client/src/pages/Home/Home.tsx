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
  import {footerLinks} from "../../utilities/constants";

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
        <Footer footerLinks={footerLinks}/>
     </>
    )
}