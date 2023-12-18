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
import { footerLinks } from "../../utilities/constants";

type HomeProps = {
  total: number;
};

export default function Home({ total }: HomeProps) {
  return (
    <>
      <Header />
      <Nav total={total} />
      <SearchBar />
      <AdsCarousel />
      <CategoriesCarousel />
      <TrendingProductsAlpha />
      <TrendingProducts />
      <Ads />
      <Footer footerLinks={footerLinks} />
    </>
  );
}
