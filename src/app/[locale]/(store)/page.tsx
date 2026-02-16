import BannerSection from "./_sections/bannerSection";
import BestSellerSection from "./_sections/bestSellerSection";
import CategoriesSection from "./_sections/categoriesSection";
import CountDownSection from "./_sections/countDownSection";
import FooterBannerSection from "./_sections/footerBannerSection";
import HeroSection from "./_sections/heroSection";
import NewArrivalSection from "./_sections/newArrivalSection";
import UserFeedbackSection from "./_sections/userFeedbackSection";

const Store = () => {
  return (
    <main className="container mx-auto mt-30 md:px-20">
      <HeroSection />
      <CategoriesSection />
      <NewArrivalSection />
      <BannerSection />
      <BestSellerSection />
      <CountDownSection />
      <UserFeedbackSection />
      <FooterBannerSection />
    </main>
  );
};

export default Store;
