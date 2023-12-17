import {
    Header,
    Nav,
    SearchBar,
    AdsCarousel,
    CategoriesCarousel,
    TrendingProductsAlpha,
    TrendingProducts,
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
        <TrendingProductsAlpha/>
        <TrendingProducts />
        <Ads />
        <Footer footerLinks={footerLinks}/>
     </>
    )
}