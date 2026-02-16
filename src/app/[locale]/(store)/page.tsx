import BannerSection from "./_sections/bannerSection";
import BestSellerSection from "./_sections/bestSellerSection";
import CategoriesSection from "./_sections/categoriesSection";
import CountDownSection from "./_sections/countDownSection";
import HeroSection from "./_sections/heroSection";
import NewArrivalSection from "./_sections/newArrivalSection";
import UserFeedbackSection from "./_sections/userFeedbackSection";

const Store = () => {
  return (
    <main className="container mx-auto mt-30">
      <HeroSection />
      <CategoriesSection />
      <NewArrivalSection />
      <BannerSection />
      <BestSellerSection />
      <CountDownSection />
      <UserFeedbackSection />
    </main>
  );
};

export default Store;
