import Hero from '../sections/Hero';
import Categories from '../sections/Categories';
import FlashSales from '../sections/FlashSales';
import FeaturedProducts from '../sections/FeaturedProducts';
import TrustSection from '../sections/TrustSection';
import BrandsSlider from '../sections/BrandsSlider';
import RecommendedProducts from '../sections/RecommendedProducts';

function Home({ onQuickView }) {
  return (
    <>
      <Hero />
      <Categories />
      <FlashSales onQuickView={onQuickView} />

      {/* PASS DOWN PROPERLY */}
      <FeaturedProducts onQuickView={onQuickView} />

      <TrustSection />
      <BrandsSlider />
      <RecommendedProducts />
    </>
  );
}

export default Home;
