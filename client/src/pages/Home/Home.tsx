import { useEffect } from "react";
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
  selectedCategory?: string;
  handleCategoryClick?: (categoryName: string) => void;
};

export default function Home({ total, selectedCategory , handleCategoryClick }: HomeProps) {
  useEffect(() => {
    document.title = 'Home'; // Set your desired dynamic page title here
    return () => {
      // Optionally, you can reset the title when the component unmounts
      document.title = 'Home';
    };
  }, []);
  
  return (
    <>
      <Header />
      <Nav total={total} />
      <SearchBar />
      <AdsCarousel />
      <CategoriesCarousel selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick}/>
      <TrendingProductsAlpha />
      <TrendingProducts />
      <Ads />
      <Footer footerLinks={footerLinks} />
    </>
  );
}
