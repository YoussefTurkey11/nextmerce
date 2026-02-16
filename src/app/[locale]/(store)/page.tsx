import BannerSection from "./_sections/bannerSection";
import BestSellerSection from "./_sections/bestSellerSection";
import CategoriesSection from "./_sections/categoriesSection";
import CountDownSection from "./_sections/countDownSection";
import HeroSection from "./_sections/heroSection";
import NewArrivalSection from "./_sections/newArrivalSection";

const Store = () => {
  return (
    <main className="container mx-auto">
      <HeroSection />
      <CategoriesSection />
      <NewArrivalSection />
      <BannerSection />
      <BestSellerSection />
      <CountDownSection />
    </main>
  );
};

export default Store;
